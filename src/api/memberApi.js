import jwtAxios from "../util/jwtUtil";
import { API_SERVER_HOST } from "../config/server";

// 백엔드 서버 주소
const prefix = `${API_SERVER_HOST}/api/members`;

// 회원 목록 조회
export const getList = async (pageParam) => {
  const { page, size, name } = pageParam;

  try {
    const res = await jwtAxios.get(`${prefix}`, {
      params: { page, size, name }
    });
    return res.data;
  } catch (err) {
    console.error("⚠️ 서버 응답 오류:", err);
    throw new Error("서버와의 연결에 문제가 있습니다.");
  }
};

// 회원 상세 조회
export const getOne = async (memberNo) => {
  const res = await jwtAxios.get(`${prefix}/${memberNo}`);
  return res.data;
};

// 회원 상태 변경
export const updateState = async (member) => {
  const res = await jwtAxios.put(`${prefix}/${member.memberNo}/state`, member);
  return res.data;
};

// ✅ 회원 수 조회
export const getCount = async () => {
  try {
    const res = await jwtAxios.get(`${prefix}/count`);
    return res.data.count; // { count: 숫자 }
  } catch (err) {
    console.error("⚠️ 회원 수 조회 실패:", err);
    throw new Error("회원 수를 가져오는 중 오류가 발생했습니다.");
  }
};
