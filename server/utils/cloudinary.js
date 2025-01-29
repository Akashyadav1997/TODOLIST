import cloudinary from "cloudinary";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const cloudinaryUpload = async (file) => {
  console.log("Cloudinary file received in function:");
  console.log(file);

  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      file.path,
      {
        resource_type: "auto",
        public_id: uuidv4(),
      },
      (error, result) => {
        console.log("Cloudinary error received before return:");
        console.log(error);

        if (error) return reject(error);

        fs.unlink(file.path, (err) => {
          if (err) {
            console.log("Error in cloudinary unlinking process:");
            console.log(err);
          }
        });

        console.log("Cloudinary callback result:");
        console.log(result);

        const formattedResult = {
          public_id: result.public_id,
          url: result.secure_url,
        };

        console.log("Formatted result:");
        console.log(formattedResult);

        resolve(formattedResult);
      }
    );
  });
};

export const cloudinaryDestroyer = async (id) => {
  if (!id) return null;
  return await cloudinary.uploader.destroy(id);
};
