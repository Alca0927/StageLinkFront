import axios from "axios";
import { API_SERVER_HOST } from "./showApi";
// 서버 주소

const prefix = `${API_SERVER_HOST}/showmanager/location`
/*
export const getOne = async (showlocation) => {
    const res = await axios.get(`${prefix}/${showlocation}`)

    return res.data
}
*/
export const getOne = async (showlocation) => {
    if (!showlocation) {
        throw new Error("showlocation is required");
    }
    
    const res = await axios.get(`${prefix}/${showlocation}`);
    return res.data;
}

export const getList = async (pageParam) => {
    const {page, size} = pageParam
    const res = await axios.get(`${prefix}/list`, {params: {page:page, size:size}})

    return res.data
}

export const postAdd = async (locationObj) => {
    const res = await axios.post(`${prefix}/`, locationObj)
    return res.data
}

/*
export const deleteOne = async (tno) => {
  const res = await jwtAxios.delete(`${prefix}/${tno}` )
  return res.data
}
*/

export const putOne = async (location) => {
  const res = await axios.put(`${prefix}/${location.showlocation}`, location)
  return res.data
}