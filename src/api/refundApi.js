import jwtAxios from "../util/jwtUtil";
import { API_SERVER_HOST } from "../config/server";


// 서버 주소
const prefix = `${API_SERVER_HOST}/registermanager/refund`

export const getOne = async (refundNo) => {
    const res = await jwtAxios.get(`${prefix}/${refundNo}`)
    console.log("Error 로그 분석용" + res.data)
    return res.data
}

export const getList = async (pageParam) => {
    const {page, size} = pageParam
    const res = await jwtAxios.get(`${prefix}/list`, {params: {page:page, size:size}})

    return res.data
}