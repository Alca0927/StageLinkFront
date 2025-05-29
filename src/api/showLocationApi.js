import jwtAxios from "../util/jwtUtil";
import { API_SERVER_HOST } from "../config/server";

// 스프링 부트 매핑명
const prefix = `${API_SERVER_HOST}/admin/showmanager/location`;

// 상세 정보 읽기
export const getOne = async (showlocation) => {
  const res = await jwtAxios.get(`${prefix}/${showlocation}`, 
);
  return res.data;
};

// 목록 읽기
export const getList = async (pageParam) => {
  const { page, size } = pageParam;
  const res = await jwtAxios.get(`${prefix}/list`, {
    params: { page, size },
  });
  return res.data;
};

// 추가 하기
export const postAdd = async (locationObj) => {
  const res = await jwtAxios.post(`${prefix}/`, locationObj, 
);
  return res.data;
};

// 수정 하기
export const putOne = async (location) => {
  const res = await jwtAxios.put(`${prefix}/${location.showlocation}`, location, 
);
  return res.data;
};
