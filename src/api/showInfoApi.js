import jwtAxios from "../util/jwtUtil";
import { API_SERVER_HOST } from "../config/server";

// 스프링 부트 매핑명
const prefix = `${API_SERVER_HOST}/admin/showmanager/showinfo`

// 상세 정보 읽기
export const getOne = async (showInfo) => {
    const res = await jwtAxios.get(`${prefix}/${showInfo}`)
    console.log("Error 로그 분석용" + res.data)
    return res.data
}

// 목록 읽기
export const getList = async (pageParam) => {
  const { page, size, type, keyword } = pageParam;

  const res = await jwtAxios.get(`${prefix}/list`, {
    params: { page, size, type, keyword },
  });

  return res.data;
};

// 추가 하기
export const postAdd = async (showinfoObj) => {
    const res = await jwtAxios.post(`${prefix}/`, showinfoObj)
    return res.data
}

/* 삭제
export const deleteOne = async (tno) => {
  const res = await jwtAxios.delete(`${prefix}/${tno}` )
  return res.data
}
*/

// 수정 하기
export const putOne = async (showInfo) => {
  const res = await jwtAxios.put(`${prefix}/${showInfo.showInfo}`, showInfo)
  return res.data
}