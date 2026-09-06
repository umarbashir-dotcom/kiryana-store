import cloudinary from "../config/cloudinary.js";

const uploadToCloudinary = (buffer) => {
    return new Promise((resolve, reject) => {

        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: "apna-kiryana/products"
            },
            (error, result) => {

                if (error) {
                    reject(error);
                    return;
                }

                resolve(result);
            }
        );

        uploadStream.end(buffer);
    });
};

export default uploadToCloudinary;