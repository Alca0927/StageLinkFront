import axios from "axios";

// 백엔드 서버 주소
export const API_SERVER_HOST = "http://localhost:8080";
const prefix = `${API_SERVER_HOST}/api/members`;

// 회원 목록 조회
export const getList = async (pageParam) => {
  const { page, size, name } = pageParam;

  try {
    const res = await axios.get(`${prefix}`, {
      params: { page, size, name }
    });
    return res.data;
  } catch (err) {
    console.error("⚠️ 서버 응답 오류:", err);
    throw new Error("서버와의 연결에 문제가 있습니다.");
  }
};

// 회원 상세
export const getOne = async (memberNo) => {
  const res = await axios.get(`${prefix}/${memberNo}`);
  return res.data;
};

// 상태 변경
export const updateState = async (member) => {
  const res = await axios.put(`${prefix}/${member.memberNo}/state`, member);
  return res.data;
};
