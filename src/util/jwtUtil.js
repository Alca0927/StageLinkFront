// 📁 src/util/jwtUtil.js

import axios from "axios";
import { API_SERVER_HOST } from "../config/server";

const jwtAxios = axios.create({
  baseURL: API_SERVER_HOST,
  withCredentials: true,
});

// 토큰 리프레시 요청
const refreshJWT = async (refreshToken) => {
  try {
    const res = await axios.get(
      `${API_SERVER_HOST}/api/login/refresh?refreshToken=${refreshToken}`
    );

    console.log("🔁 Token refreshed:", res.data);

    localStorage.setItem("accessToken", res.data.accessToken);
    localStorage.setItem("refreshToken", res.data.refreshToken);

    return res.data;
  } catch (err) {
    console.error("❌ Token refresh failed", err);
    throw err;
  }
};

// 요청 인터셉터
jwtAxios.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      throw new Error("REQUIRE_LOGIN");
    }

    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  (err) => Promise.reject(err)
);

// 응답 인터셉터
jwtAxios.interceptors.response.use(
  async (res) => {
    const data = res.data;

    if (data && data.error === "ERROR_ACCESS_TOKEN") {
      console.log("🔁 Access token expired. Refreshing...");

      const refreshToken = localStorage.getItem("refreshToken");
      const originalRequest = res.config;

      if (originalRequest._retry) {
        return Promise.reject("Token refresh retry failed");
      }

      originalRequest._retry = true;

      const newTokens = await refreshJWT(refreshToken);
      originalRequest.headers.Authorization = `Bearer ${newTokens.accessToken}`;

      return jwtAxios(originalRequest);
    }

    return res;
  },
  (err) => Promise.reject(err)
);

export default jwtAxios;
