const { v2 : cloudinary } = require('cloudinary');
const fs = require('fs');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

 const uploadClodinary = async (localFile) => {
    try {
        if (localFile) {
            const uploadedContent = await cloudinary.uploader.upload(localFile, {
                resource_type: "auto"
            });
    
            return uploadedContent;
        }
    } catch (error) {
        console.log(error)
        fs.unlink(localFile);
        return null;
    }
}

module.exports = uploadClodinary;