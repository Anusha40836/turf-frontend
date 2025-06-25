// utils/uploadToCloudinary.js
export const uploadToCloudinary = async (base64Image) => {
  const data = new FormData();
  data.append("file", base64Image);
  data.append("upload_preset", "your_upload_preset"); // Set this in Cloudinary
  data.append("cloud_name", "dbzf9izfz");

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/dbzf9izfz/image/upload",
    {
      method: "POST",
      body: data,
    }
  );

  const result = await res.json();
  return result.secure_url; // This is the image URL to store in DB
};
