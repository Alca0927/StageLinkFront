import axios from "axios";
import { API_SERVER_HOST } from "./showApi";

const host = `${API_SERVER_HOST}/api`

export const loginPost = async (loginParam) => {
    const headers = {headers: {"Content-Type":"application/x-www-form-urlencoded"}}

    const form = new FormData()
    form.append('username',loginParam.email)
    form.append('password',loginParam.pw)

    try {
    const res = await axios.post(`${host}/login`,form,headers);

    return res.data
    } catch (error) {
        return { error: "ERROR_LOGIN" };
    }
}