import jwtAxios from "../util/jwtUtil";
import { API_SERVER_HOST } from "../config/server"

// 서버 주소 - admin 부분 제거
const prefix = `${API_SERVER_HOST}/admin`

// 회원 통계 데이터 조회
export const getMemberStat = async (year, month) => {
    const res = await jwtAxios.get(`${prefix}/stat/member/${year}/${month}`)
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
    
    try {
        const res = await jwtAxios.get(`${prefix}/stat/member/${prevYear}/${prevMonth}`)
        return res.data
    } catch (error) {
        console.error('이전 월 회원 통계 조회 실패:', error);
        throw error;
    }
}

export const postGenerate = async (year, month) => {
  const res = await jwtAxios.post(`${prefix}/stat/member/${year}/${month}`);
  return res.data;
};

// ----------------매출----------------------
// 매출 통계 데이터 조회
export const getSalesStat = async (year, month) => {
    try {
        const res = await jwtAxios.get(`${prefix}/stat/sales/${year}/${month}`)
        console.log('매출 통계 API 응답:', res.data); // 디버깅용
        return res.data
    } catch (error) {
        console.error('매출 통계 조회 API 에러:', error.response?.data || error.message);
        throw error;
    }
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
    
    try {
        const res = await jwtAxios.get(`${prefix}/stat/sales/${prevYear}/${prevMonth}`)
        return res.data
    } catch (error) {
        console.error('이전 월 매출 통계 조회 실패:', error);
        throw error;
    }
}

// 매출 통계 재계산
export const recalculateSalesStat = async (year, month) => {
    try {
        const res = await jwtAxios.post(`${prefix}/sales/recalculate/${year}/${month}`)
        console.log('매출 통계 재계산 API 응답:', res.data); // 디버깅용
        return res.data
    } catch (error) {
        console.error('매출 통계 재계산 API 에러:', error.response?.data || error.message);
        throw error;
    }
}

// 월별 통계 세부 사항
export const monthlyShowSalesDetail = async (year, month) => {
    try {
        const res = await jwtAxios.get(`${prefix}/stat/show/${year}/${month}`);
        return res.data;
    } catch (error) {
        throw error;
    }
}