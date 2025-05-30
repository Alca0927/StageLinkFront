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

export const getList = async (pageParam) => {
  const { page, size, type, keyword } = pageParam;
  const params = { page, size };
  if (type && keyword) {
    params.type = type;
    params.keyword = keyword;
  }
  const res = await jwtAxios.get(`${prefix}/list`, { params });
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
