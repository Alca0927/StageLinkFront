import axios from "axios";

// 서버 주소
export const API_SERVER_HOST = "http://localhost:8080/admin"

const prefix = `${API_SERVER_HOST}/showmanager/show`

export const getOne = async (showNo) => {
    const res = await axios.get(`${prefix}/${showNo}`)
    console.log(res.data)
    return res.data
}

export const getList = async (pageParam) => {
    const {page, size} = pageParam
    const res = await axios.get(`${prefix}/list`, {params: {page:page, size:size}})

    return res.data
}

export const postAdd = async (showObj) => {
    const res = await axios.post(`${prefix}/add`, showObj)
    return res.data
}

/*
export const deleteOne = async (tno) => {
  const res = await jwtAxios.delete(`${prefix}/${tno}` )
  return res.data
}
*/

export const putOne = async (show) => {
  const res = await axios.put(`${prefix}/${show.showNo}`, show)
  return res.data
}
