import axios from "axios";

export const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "ml_default"); // 미리 설정한 unsigned preset 이름

  const res = await axios.post(
    "https://api.cloudinary.com/v1_1/dvpwxyqji/image/upload",
    formData
  );

  return res.data.secure_url;
};
