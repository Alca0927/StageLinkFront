import jwtAxios from "../util/jwtUtil";
import { API_SERVER_HOST } from "./showApi";

// 서버 주소
const prefix = `${API_SERVER_HOST}/showmanager/actorshow`

export const getOne = async (actorNo, showInfoId) => {
    const res = await jwtAxios.get(`${prefix}/${actorNo}/${showInfoId}`)
    console.log("ActorShow 조회 결과:", res.data)
    return res.data
}

export const getList = async (pageParam) => {
    const {page, size} = pageParam
    const res = await jwtAxios.get(`${prefix}/list`, {params: {page:page, size:size}})
    return res.data
}

export const postAdd = async (actorShowObj) => {
    const res = await jwtAxios.post(`${prefix}/add`, actorShowObj)
    return res.data
}

/*
export const deleteOne = async (tno) => {
  const res = await jwtAxios.delete(`${prefix}/${tno}` )
  return res.data
}
*/

// ??
export const putOne = async (actorShowObj) => {
    const { actorDTO, showInfoDTO } = actorShowObj;
    
    // URL 파라미터로 사용할 값들 추출
    const actorNo = actorDTO.actorNo;
    const showInfoId = showInfoDTO.showInfo;
    
    // PUT 요청 - 전체 actorShowObj를 body로 전송
    const res = await jwtAxios.put(`${prefix}/${actorNo}/${showInfoId}`, actorShowObj)
    return res.data
}