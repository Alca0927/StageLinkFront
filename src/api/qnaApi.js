import jwtAxios from "../util/jwtUtil";
import { API_SERVER_HOST } from "../config/server";

// Spring Boot 서버 주소
const prefix = `${API_SERVER_HOST}/api/qna`;

// Q&A 목록 조회
export const getQnaList = async ({ page = 1, size = 10 }) => {
    const res = await jwtAxios.get(`${prefix}`, {
        params: { page, size }
    });
    return res.data;
};

// Q&A 상세 조회
export const getQnaDetail = async (questionNo) => {
    const res = await jwtAxios.get(`${prefix}/${questionNo}`);
    return res.data;
};

// Q&A 답변 등록 또는 수정
export const updateQnaAnswer = async (questionNo, data) => {
    const res = await jwtAxios.put(`${prefix}/${questionNo}`, data);
    return res.data;
};

// Q&A 총 개수 조회
export const getQnaCount = async () => {
    const res = await jwtAxios.get(`${prefix}/count`);
    return res.data;
};