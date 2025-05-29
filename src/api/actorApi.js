import jwtAxios from "../util/jwtUtil";
import { API_SERVER_HOST } from "../config/server";

const prefix = `${API_SERVER_HOST}/admin/showmanager/actor`;

// 상세 조회
export const getOne = async (actorNo) => {
  const res = await jwtAxios.get(`${prefix}/${actorNo}`);
  return res.data;
};

// 목록 조회
export const getList = async ({ page, size, name }) => {
  const res = await jwtAxios.get(`${prefix}/list`, {
    params: { page, size, name },
  });

  const data = res.data;
  if (!data.dtoList) data.dtoList = [];
  if (!data.pageNumList) data.pageNumList = [];

  return data;
};

// 등록 (JSON)
export const postAdd = async (actorObj) => {
  const res = await jwtAxios.post(`${prefix}/add`, actorObj);
  return res.data;
};

// 수정 (JSON)
export const putOne = async (actorObj) => {
  const actorNo = actorObj.actorNo;
  const res = await jwtAxios.put(`${prefix}/${actorNo}`, actorObj);
  return res.data;
};
