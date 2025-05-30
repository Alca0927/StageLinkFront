import jwtAxios from "../util/jwtUtil"
import { API_SERVER_HOST } from "../config/server"

// 스프링 부트 매핑명
const prefix = `${API_SERVER_HOST}/admin/showmanager/show`

// 상세 정보 읽기
export const getOne = async (showNo) => {
    const res = await jwtAxios.get(`${prefix}/${showNo}`)
    console.log(res.data)
    return res.data
}


export const getList = async (pageParam) => {
  const { page, size, type, keyword } = pageParam;

  const res = await jwtAxios.get(`${prefix}/list`, {
    params: { page, size, type, keyword },
  });

  return res.data;
};


// 추가 하기
export const postAdd = async (showObj) => {
    const res = await jwtAxios.post(`${prefix}/add`, showObj)
    return res.data
}

/* 삭제
export const deleteOne = async (tno) => {
  const res = await jwtAxios.delete(`${prefix}/${tno}` )
  return res.data
}
*/

// 수정 하기
export const putOne = async (show) => {
  const res = await jwtAxios.put(`${prefix}/${show.showNo}`, show)
  return res.data
}
