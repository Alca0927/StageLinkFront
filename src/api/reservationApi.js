import jwtAxios from "../util/jwtUtil";
import { API_SERVER_HOST } from "./showApi";

// 서버 주소
const prefix = `${API_SERVER_HOST}/registermanager/reservation`

export const getOne = async (reservationNo) => {
    const res = await jwtAxios.get(`${prefix}/${reservationNo}`)
    console.log("Error 로그 분석용" + res.data)
    return res.data
}

export const getList = async (pageParam) => {
    const {page, size} = pageParam
    const res = await jwtAxios.get(`${prefix}/list`, {params: {page:page, size:size}})

    return res.data
}