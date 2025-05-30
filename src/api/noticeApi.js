import jwtAxios from "../util/jwtUtil";
import { API_SERVER_HOST } from "../config/server";

// 서버 주소 접두어
const prefix = `${API_SERVER_HOST}/api/notices`;

// 🔹 공지사항 상세 정보 읽기
export const getOne = async (noticeNo) => {
  const res = await jwtAxios.get(`${prefix}/${noticeNo}`);
  return res.data;
};

// 🔹 공지사항 목록 읽기
export const getList = async (pageParam) => {
  const { page, size } = pageParam;
  const res = await jwtAxios.get(`${prefix}/list`, {
    params: { page, size }
  });
  return res.data;
};

// ✅ 공지사항 등록 (경로 수정됨: '/add' → '')
export const postAdd = async (noticeObj) => {
  const res = await jwtAxios.post(`${prefix}`, noticeObj);
  return res.data;
};
