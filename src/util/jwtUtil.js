import axios from "axios";
import { API_SERVER_HOST } from "../config/server";

const jwtAxios = axios.create({
  baseURL: API_SERVER_HOST,
  withCredentials: true,
});

// 토큰 리프레시
const refreshJWT = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  const accessToken = localStorage.getItem("accessToken");

  if (!refreshToken || !accessToken) {
    throw new Error("NO_TOKENS");
  }

  const res = await axios.post(
    `${API_SERVER_HOST}/admin/api/login/refresh`,
    { refreshToken },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const { accessToken: newAccessToken, refreshToken: newRefreshToken } = res.data;

  localStorage.setItem("accessToken", newAccessToken);
  localStorage.setItem("refreshToken", newRefreshToken);

  console.log("🔁 Token refreshed!");

  return newAccessToken;
};

// 요청 인터셉터
jwtAxios.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) throw new Error("REQUIRE_LOGIN");

    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  (err) => Promise.reject(err)
);

// 응답 인터셉터
jwtAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      try {
        originalRequest._retry = true;
        const newAccessToken = await refreshJWT();
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return jwtAxios(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default jwtAxios;
