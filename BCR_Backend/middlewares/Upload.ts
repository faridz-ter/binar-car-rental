import { Request, Response, NextFunction } from 'express';

import media from '../config/media';

class Upload {
    constructor() { }

    async handleUpload(req: Request, res: Response, next: NextFunction) {
        try {
            if (!req.file) {
                return res.status(400).json({ error: 'No file uploaded' });
            }
    
            const fileBase64 = req.file.buffer.toString('base64');
            const file = `data:${req.file.mimetype};base64,${fileBase64}`;
    
            let imgURL: string = '';
    
            try {
                const result = await new Promise<any>((resolve, reject) => {
                    media.storage.uploader.upload(file, (err: Error | null, result: any) => {
                        if (err) {
                            console.log(err);
                            reject(err);
                        }
                        resolve(result);
                    });
                });
    
            imgURL = result.url;
    
            } catch (error) {
                return res.status(404).json({
                    message: error,
                    success: false,
                });
            }
            (req as any).imgURL = imgURL;
            next();
    
        } catch (error: any) {
            console.error('Error uploading file:', error);
            return res.status(500).json({ error: 'Error uploading file' });
        }
    }
    
}

export default new Upload();