import jwtAxios from "../util/jwtUtil";
import { API_SERVER_HOST } from "./showApi";

// 서버 주소
const prefix = `${API_SERVER_HOST}/stat`

// 회원 통계 데이터 조회
export const getMemberStat = async (year, month) => {
    const res = await jwtAxios.get(`${prefix}/member/${year}/${month}`)
    return res.data
}

// 회원 이전 달 통계 데이터 조회 (비교용)
export const getPrevMonthStat = async (year, month) => {
    let prevYear = year;
    let prevMonth = month - 1;
    
    // 1월인 경우 이전 년도 12월로 설정
    if (prevMonth === 0) {
        prevYear = year - 1;
        prevMonth = 12;
    }
    
    const res = await jwtAxios.get(`${prefix}/member/${prevYear}/${prevMonth}`)
    return res.data
}

// 매출 통계 데이터 조회
export const getSalesStat = async (year, month) => {
    const res = await jwtAxios.get(`${prefix}/sales/${year}/${month}`)
    return res.data
}

// 이전 달 매출 통계 데이터 조회 (비교용)
export const getPrevMonthSalesStat = async (year, month) => {
    let prevYear = year;
    let prevMonth = month - 1;
    
    // 1월인 경우 이전 년도 12월로 설정
    if (prevMonth === 0) {
        prevYear = year - 1;
        prevMonth = 12;
    }
    
    const res = await jwtAxios.get(`${prefix}/sales/${prevYear}/${prevMonth}`)
    return res.data
}

// 매출 통계 재계산
export const recalculateSalesStat = async (year, month) => {
    const res = await jwtAxios.post(`${prefix}/sales/recalculate/${year}/${month}`)
    return res.data
}