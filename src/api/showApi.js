import axios from "axios";

// 서버 주소
export const API_SERVER_HOST = "http://localhost:3000/admin"

const prefix = `${API_SERVER_HOST}/showmanager/showlist`

export const getOne = async (tno) => {
    const res = await axios.get(`${prefix}/${tno}`)

    return res.data
}

export const getList = async (pageParam) => {
    const {page, size} = pageParam
    const res = await axios.get(`${prefix}/list`, {params: {page:page, size:size}})

    return res.data
}