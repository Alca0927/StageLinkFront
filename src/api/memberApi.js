import axios from "axios";

// 백엔드 API 서버 주소
export const API_SERVER_HOST = "http://localhost:8080";

// 회원 관련 API prefix
const prefix = `${API_SERVER_HOST}/api/members`;

// 회원 목록 조회 (이름 검색 포함, 페이지네이션)
export const getList = async ({ name = "", page = 0, size = 10 }) => {
    const res = await axios.get(prefix, {
        params: { name, page, size },
    });
    return res.data;
};

// 특정 회원 상세 조회
export const getOne = async (memberNo) => {
    const res = await axios.get(`${prefix}/${memberNo}`);
    return res.data;
};

// 회원 상태 변경 (예: 탈퇴 처리 등)
export const updateState = async (memberNo, dto) => {
    await axios.put(`${prefix}/${memberNo}/state`, dto);
};