// src/util/uploadToCloudinary.js
const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "stagelink_profile"); // Cloudinary에서 설정한 unsigned preset
  const cloudName = "dvpwxyqji"; // 본인의 Cloudinary Cloud 이름

  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: "POST",
    body: formData
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("Cloudinary Upload Error:", errorData);
    throw new Error("Cloudinary upload failed");
  }

  const data = await response.json();
  return data.secure_url;
};

export default uploadToCloudinary;
