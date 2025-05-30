// 📁 src/api/loginApi.js

import axios from "axios";
import { API_SERVER_HOST } from "../config/server";

const host = `${API_SERVER_HOST}/admin/api`;

export const loginPost = async (loginParam) => {
  const headers = {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  };

  const form = new FormData();
  form.append("username", loginParam.username);
  form.append("password", loginParam.pw);

  try {
    const res = await axios.post(`${host}/login`, form, headers);

    console.log("✅ 로그인 성공 응답:", res.data);

    if (res.data?.accessToken && res.data?.refreshToken) {
      return res.data;
    } else {
      console.warn("⚠️ 로그인 성공했지만 토큰이 없습니다.");
      return { error: "INVALID_TOKEN" };
    }
  } catch (error) {
    console.error("❌ 로그인 실패:", error);
    return {
      error: "ERROR_LOGIN",
      message:
        error.response?.data?.message ||
        "서버와 통신 중 오류가 발생했습니다.",
    };
  }
};
