import axios from "axios";

// Spring Boot 서버 주소
const API_SERVER_HOST = "http://localhost:8080";

const prefix = `${API_SERVER_HOST}/api/reports`;

// 불법 신고 목록 조회 (검색 포함)
export const getList = async ({ page = 1, size = 10, reason = '' }) => {
    const res = await axios.get(`${prefix}`, {
        params: { page, size, reason }
    });
    return res.data;
};

// 신고 상세 조회
export const getReportDetail = async (reportNo) => {
    const res = await axios.get(`${prefix}/${reportNo}`);
    return res.data;
};

// 총 신고 건수 조회 (선택 사항)
export const getReportCount = async () => {
    const res = await axios.get(`${prefix}/count`);
    return res.data;
};