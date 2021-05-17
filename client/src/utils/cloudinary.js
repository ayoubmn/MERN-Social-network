const cloudinary = require('cloudinary/lib/cloudinary').v2;
cloudinary.config({
  cloud_name: 'socialnetcloud',
  api_key: '832928326993279',
  api_secret: 'OwbIG5SumdR_jmBvfnb9VeC91Oc'
}); 
module.exports = cloudinary;