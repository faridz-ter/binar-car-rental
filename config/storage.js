const cloudinary = require('cloudinary').v2;
          
cloudinary.config({ 
  cloud_name: 'dqhdxgqyc', 
  api_key: '912836575418419', 
  api_secret: 'gWz0x2bpsY1x1bBYdKs6oeaYvxM' 
});

module.exports = cloudinary;
