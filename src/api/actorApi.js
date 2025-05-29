import jwtAxios from "../util/jwtUtil";
import { API_SERVER_HOST } from "../config/server";

// 서버 주소
const prefix = `${API_SERVER_HOST}/admin/showmanager/actor`;

// 상세 정보 읽기
export const getOne = async (actorNo) => {
  const res = await jwtAxios.get(`${prefix}/${actorNo}`);
  return res.data;
};

// 목록 읽기
export const getList = async ({ page, size, name }) => {
  const res = await jwtAxios.get(`${prefix}/list`, {
    params: { page, size, name },
  });

  const data = res.data;

  // ✅ 방어 처리: dtoList가 없을 경우 빈 배열 할당
  if (!data.dtoList) data.dtoList = [];

  // ✅ 방어 처리: pageNumList가 없을 경우 빈 배열 할당
  if (!data.pageNumList) data.pageNumList = [];

  return data;
};

// 추가 하기
export const postAdd = async (actorObj) => {
  const res = await jwtAxios.post(`${prefix}/add`, actorObj);
  return res.data;
};

// (선택) 삭제 
/*
export const deleteOne = async (actorNo) => {
  const res = await jwtAxios.delete(`${prefix}/${actorNo}`);
  return res.data;
};
*/

// 수정 하기
export const putOne = async (actorObj) => {
  const res = await jwtAxios.put(`${prefix}/${actorObj.actorNo}`, actorObj);
  return res.data;
};
