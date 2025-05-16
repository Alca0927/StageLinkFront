import axios from "axios";

// Spring Boot 서버 주소
const API_SERVER_HOST = "http://localhost:8080";

const prefix = `${API_SERVER_HOST}/api/qna`;

// Q&A 목록 조회
export const getQnaList = async ({ page = 1, size = 10 }) => {
    const res = await axios.get(`${prefix}`, {
        params: { page, size }
    });
    return res.data;
};

// Q&A 상세 조회
export const getQnaDetail = async (questionNo) => {
    const res = await axios.get(`${prefix}/${questionNo}`);
    return res.data;
};

// Q&A 답변 등록 또는 수정
export const updateQnaAnswer = async (questionNo, data) => {
    const res = await axios.put(`${prefix}/${questionNo}`, data);
    return res.data;
};

// Q&A 총 개수 조회
export const getQnaCount = async () => {
    const res = await axios.get(`${prefix}/count`);
    return res.data;
};