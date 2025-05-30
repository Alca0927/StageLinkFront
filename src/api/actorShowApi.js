import jwtAxios from "../util/jwtUtil";
import { API_SERVER_HOST } from "../config/server";


// 서버 주소
const prefix = `${API_SERVER_HOST}/admin/showmanager/actorshow`

// 상세 정보 읽기
export const getOne = async (actorNo, showInfoId) => {
    const res = await jwtAxios.get(`${prefix}/${actorNo}/${showInfoId}`)
    return res.data
}

// 목록 읽기
export const getList = async ({ page, size, type, keyword }) => {
  const res = await jwtAxios.get(`${prefix}/list`, {
    params: { page, size, type, keyword }
  });
  return res.data;
};



// 추가 하기
export const postAdd = async (actorShowObj) => {
    const res = await jwtAxios.post(`${prefix}/add`, actorShowObj)
    return res.data
}

/* 삭제
export const deleteOne = async (tno) => {
  const res = await jwtAxios.delete(`${prefix}/${tno}` )
  return res.data
}
*/

// 수정 하기 
export const putOne = async (actorShowObj) => {
    const { actorDTO, showInfoDTO } = actorShowObj;
    
    // URL 파라미터로 사용할 값들 추출
    const actorNo = actorDTO.actorNo;
    const showInfoId = showInfoDTO.showInfo;
    
    // PUT 요청 - 전체 actorShowObj를 body로 전송
    const res = await jwtAxios.put(`${prefix}/${actorNo}/${showInfoId}`, actorShowObj)
    return res.data
}