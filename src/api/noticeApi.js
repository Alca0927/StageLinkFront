import jwtAxios from "../util/jwtUtil";
import { API_SERVER_HOST } from "../config/server";

// 서버 주소
const prefix = `${API_SERVER_HOST}/api/notices`

// 상세 정보 읽기
export const getOne = async (tno) => {
    const res = await jwtAxios.get(`${prefix}/${tno}`)
    return res.data
}

// 목록 읽기
export const getList = async (pageParam) => {
    const {page, size} = pageParam
    const res = await jwtAxios.get(`${prefix}/list`, {params: {page:page, size:size}})
    return res.data
}

export const postAdd = async (noticeObj) => {
    const res = await jwtAxios.post(`${prefix}/add`, noticeObj)
    return res.data
}