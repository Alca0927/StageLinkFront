import jwtAxios from "../util/jwtUtil";
import { API_SERVER_HOST } from "./showApi";

// 서버 주소
const prefix = `${API_SERVER_HOST}/showmanager/showinfo`

export const getOne = async (showInfo) => {
    const res = await jwtAxios.get(`${prefix}/${showInfo}`)
    console.log("Error 로그 분석용" + res.data)
    return res.data
}

export const getList = async (pageParam) => {
    const {page, size} = pageParam
    const res = await jwtAxios.get(`${prefix}/list`, {params: {page:page, size:size}})

    return res.data
}

export const postAdd = async (showinfoObj) => {
    const res = await jwtAxios.post(`${prefix}/`, showinfoObj)
    return res.data
}

/*
export const deleteOne = async (tno) => {
  const res = await jwtAxios.delete(`${prefix}/${tno}` )
  return res.data
}
*/

export const putOne = async (showInfo) => {
  const res = await jwtAxios.put(`${prefix}/${showInfo.showInfo}`, showInfo)
  return res.data
}