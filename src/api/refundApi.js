import jwtAxios from "../util/jwtUtil";
import { API_SERVER_HOST } from "../config/server";


// 서버 주소
const prefix = `${API_SERVER_HOST}/admin/registermanager/refund`

// 상세 정보 읽기
export const getOne = async (refundNo) => {
    const res = await jwtAxios.get(`${prefix}/${refundNo}`)
    return res.data
}

// 목록 읽기
export const getList = async (pageParam) => {
    const {page, size} = pageParam
    const res = await jwtAxios.get(`${prefix}/list`, {params: {page:page, size:size}})
    return res.data
}