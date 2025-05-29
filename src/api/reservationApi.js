import jwtAxios from "../util/jwtUtil";
import { API_SERVER_HOST } from "../config/server";


// 스프링 부트 매핑명
const prefix = `${API_SERVER_HOST}/admin/registermanager/reservation`

// 상세 정보 읽기
export const getOne = async (reservationNo) => {
    const res = await jwtAxios.get(`${prefix}/${reservationNo}`)
    console.log("Error 로그 분석용" + res.data)
    return res.data
}

// 목록 읽기
export const getList = async (pageParam) => {
    const {page, size} = pageParam
    const res = await jwtAxios.get(`${prefix}/list`, {params: {page:page, size:size}})

    return res.data
}