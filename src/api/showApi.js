import jwtAxios from "../util/jwtUtil"
import { API_SERVER_HOST } from "../config/server"

const prefix = `${API_SERVER_HOST}/showmanager/show`

export const getOne = async (showNo) => {
    const res = await jwtAxios.get(`${prefix}/${showNo}`)
    console.log(res.data)
    return res.data
}

export const getList = async (pageParam) => {
    const {page, size} = pageParam
    const res = await jwtAxios.get(`${prefix}/list`, {params: {page:page, size:size}})

    return res.data
}

export const postAdd = async (showObj) => {
    const res = await jwtAxios.post(`${prefix}/add`, showObj)
    return res.data
}

/*
export const deleteOne = async (tno) => {
  const res = await jwtAxios.delete(`${prefix}/${tno}` )
  return res.data
}
*/

export const putOne = async (show) => {
  const res = await jwtAxios.put(`${prefix}/${show.showNo}`, show)
  return res.data
}
