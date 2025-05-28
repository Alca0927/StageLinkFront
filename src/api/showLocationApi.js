import axios from 'axios';
import { API_SERVER_HOST } from "../config/server";


const prefix = `${API_SERVER_HOST}/showmanager/location`;

export const getOne = async (showlocation) => {
  const token = localStorage.getItem("accessToken");
  const res = await axios.get(`${prefix}/${showlocation}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return res.data;
};

export const getList = async (pageParam) => {
  const { page, size } = pageParam;
  const token = localStorage.getItem("accessToken");
  const res = await axios.get(`${prefix}/list`, {
    params: { page, size },
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return res.data;
};

export const postAdd = async (locationObj) => {
  const token = localStorage.getItem("accessToken");
  const res = await axios.post(`${prefix}/`, locationObj, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return res.data;
};

export const putOne = async (location) => {
  const token = localStorage.getItem("accessToken");
  const res = await axios.put(`${prefix}/${location.showlocation}`, location, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return res.data;
};
