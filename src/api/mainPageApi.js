import jwtAxios from "../util/jwtUtil";
import { API_SERVER_HOST } from "../config/server";

// 백엔드 서버 주소
const prefix = `${API_SERVER_HOST}/admin`;

// 회원 관리 메인 페이지
export const getMembermanager = async () => {
    const res = await jwtAxios.get(`${prefix}/membermanager`)
    return res.data
}
// 공연 관리 메인 페이지
export const getShowmanager = async () => {
    const res = await jwtAxios.get(`${prefix}/showmanager`)
    return res.data
}
// 공지 & QnA 메인 페이지
export const getNoticemanager = async () => {
    const res = await jwtAxios.get(`${prefix}/noticemanager`)
    return res.data
}
// 예매 관리 메인 페이지
export const getRegistermanager = async () => {
    const res = await jwtAxios.get(`${prefix}/registermanager`)
    return res.data
}