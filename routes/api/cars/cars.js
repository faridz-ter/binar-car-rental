const knex = require('knex');
const knexConfig = require('../../../config/knexfile');
const db = knex(knexConfig.development);
const Router = require('express').Router;
const storage = require('../../../config/storage');
const upload = require('../../../config/upload');

const carRoutes = () => {
    const carRouter = Router();

    // list cars
    carRouter.get('/', async (req, res) => {
        try {
          const data = await db.select('*').from('cars');
    
          if (data.length === 0) {
            res.status(404).json({ type: 'failed', message: 'Tidak ada Data!' });
          } else {
            res.status(200).json({ type: 'success', message: 'Berhasil mengambil data dari database!', data: data });
          }
        } catch (error) {
          console.error(error);
          res.status(500).json({ type: 'failed', message: 'Gagal mengambil data dari database!' });
        }
      });

    // single car
    carRouter.get('/:carId', async (req, res) => {
        const id = req.params.carId;
        try {
          const data = await db.select('*').from('cars').where('car_id', '=', id);
    
          if (data.length === 0) {
            res.status(404).json({ type: 'failed', message: 'Tidak ada Data!' });
          } else {
            res.status(200).json({ type: 'success', message: 'Berhasil mengambil data dari database!', data: data[0] });
          }
        } catch (error) {
          console.error(error);
          res.status(500).json({ type: 'failed', message: 'Gagal mengambil data dari database!' });
        }
      });

    // create car
    carRouter.post('/', upload.single('file'), async (req, res) => {
        try {
          const { name, price, start_rent, finish_rent } = req.body;
    
          if (req.file) {
            const fileBase64 = req.file.buffer.toString('base64');
            const file = `data:${req.file.mimetype};base64,${fileBase64}`;
    
            storage.uploader.upload(file, async (err, result) => {
              if (err) {
                console.log(err);
                return res.status(400).json({ type: 'failed', message: 'Gagal upload gambar' });
              }
              const postData = {
                name : name,
                price : price,                
                picture: result.url,
                start_rent : start_rent,
                finish_rent : finish_rent
              };
              await db('cars').insert(postData);
              res.status(200).json({
                type: 'success',
                message: 'Upload gambar dan data berhasil!',
                data: postData,
              });
            });
          } else {
            return res.status(400).json({ type: 'failed', message: 'Tidak ada gambar yang diunggah' });
          }
        } catch (error) {
          console.error(error);
          res.status(500).json({ type: 'failed', message: 'Gagal menyimpan data ke database' });
        }
      });

    // update car
    carRouter.put('/:carId', upload.single('file'), async (req, res) => {
        try {
          const id = req.params.carId;
          const { name, price, start_rent, finish_rent } = req.body;
    
          if (req.file) {
            const fileBase64 = req.file.buffer.toString('base64');
            const file = `data:${req.file.mimetype};base64,${fileBase64}`;
    
            storage.uploader.upload(file, async (err, result) => {
              if (err) {
                console.log(err);
                throw new Error('Gagal upload gambar');
              }
              const updatedData = {
                name : name,
                price : price,                
                picture: result.url,
                start_rent : start_rent,
                finish_rent : finish_rent
              };
    
              await db('cars').where('car_id', '=', id).update(updatedData);
              res.status(200).json({
                type: 'success',
                message: 'Data berhasil diperbarui!',
                data: updatedData,
              });
            });
          } else {
            const updatedData = {
                name : name,
                price : price,
                start_rent : start_rent,
                finish_rent : finish_rent
            };
    
            await db('cars').where('car_id', '=', id).update(updatedData);
            res.status(200).json({
              type: 'success',
              message: 'Data berhasil diperbarui!',
              data: updatedData
            });
          }
        } catch (error) {
          console.error(error);
          res.status(500).json({ type: 'failed', message: 'Gagal memperbarui data di database' });
        }
      });

    // delete car
    carRouter.delete('/:carId', async (req, res) => {
        const id = req.params.carId;
    
        await db('cars').where('car_id', '=', id).del().catch((error) => {
          console.error(error);
          res.status(500).json({ type: 'failed', message: 'Gagal menghapus data dari database' });
        });
    
        res.status(200).json({
          type: 'success',
          message: 'Data berhasil dihapus!',
          id: id
        });
      });

    return carRouter;
};

module.exports = carRoutes;
