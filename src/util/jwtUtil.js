import axios from "axios";
import { API_SERVER_HOST } from "../config/server";


// ✅ 커스텀 axios 인스턴스 생성
const jwtAxios = axios.create({
  baseURL: API_SERVER_HOST,
  withCredentials: true, // 필요한 경우만 true
});

// ✅ 토큰 리프레시 함수
const refreshJWT = async (accessToken, refreshToken) => {
  try {
    const res = await axios.get(
      `${API_SERVER_HOST}/api/login/refresh?refreshToken=${refreshToken}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    console.log("🔁 Token refreshed:", res.data);

    // 새 토큰 localStorage에 저장
    localStorage.setItem("accessToken", res.data.accessToken);
    localStorage.setItem("refreshToken", res.data.refreshToken);

    return res.data;
  } catch (err) {
    console.error("❌ Token refresh failed", err);
    throw err;
  }
};

// ✅ 요청 전 인터셉터
jwtAxios.interceptors.request.use(
  (config) => {
    console.log("📤 Request interceptor");

    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      console.warn("⚠️ Access token not found");
      throw new Error("REQUIRE_LOGIN"); // 👈 명확한 에러 메시지
    }

    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  (err) => {
    console.log("❌ Request error", err);
    return Promise.reject(err);
  }
);

// ✅ 응답 후 인터셉터
jwtAxios.interceptors.response.use(
  async (res) => {
    const data = res.data;

    // 액세스 토큰 오류 → 토큰 갱신 시도
    if (data && data.error === "ERROR_ACCESS_TOKEN") {
      console.log("🔁 Access token expired. Refreshing...");

      const oldAccessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");

      const newTokens = await refreshJWT(oldAccessToken, refreshToken);

      // 원래 요청 복제 및 재시도
      const originalRequest = res.config;
      originalRequest.headers.Authorization = `Bearer ${newTokens.accessToken}`;

      return await jwtAxios(originalRequest); // ✅ 변경: jwtAxios로 재요청
    }

    return res;
  },
  (err) => {
    console.log("❌ Response error", err);
    return Promise.reject(err);
  }
);

export default jwtAxios;
