import axios from "axios"
import { getCookie, setCookie } from "./cookieUtil"
import { API_SERVER_HOST } from "../api/showApi"

const jwtAxios = axios.create()

const refreshJWT = async (accessToken, refreshToken) => {
    const host = API_SERVER_HOST
    const header = {headers: {"Authorization" : `Bearer ${accessToken}`}}
    const res = await axios.get(`${host}/api/login/refresh?refreshToken=${refreshToken}`, header)

    console.log("--------------------")
    console.log(res.data)
    
    return res.data
}


// 요청 전
const beforeReq = (config) => {
    console.log("before request....")
    const login = getCookie("login")
    if(!login){
        console.log("login NOT FOUND")
        return Promise.reject(
            {
                response:
                {
                    data:
                    {error: "REQUIRE_LOGIN"}
                }
            }
        )
    }
    
    const {accessToken} = login
    config.headers.Authorization = `Bearer ${accessToken}`

    return config
}


// 요청 실패
const requestFail = (err) => {
    console.log("request error......")
    return Promise.reject(err)
}

// 반응 반환 전

const beforeRes = async (res) => {
    console.log("before return response.......")
    console.log(res)

    const data = res.data

    if(data && data.error === 'ERROR_ACCESS_TOKEN'){
        const loginCookieValue = getCookie("login")
        
        const result = await refreshJWT(loginCookieValue.accessToken,
            loginCookieValue.refreshToken)
        console.log("refreshJWT RESULT",result)

        loginCookieValue.accessToken = result.accessToken
        loginCookieValue.refreshToken = result.refreshToken

        setCookie("login", JSON.stringify(loginCookieValue), 1)

        const originalRequest  = res.config
        originalRequest.headers.Authorization = `Bearer ${result.accessToken}`
        return await axios(originalRequest)
    }
    return res
}



// 반응 실패
const responseFail = (err) => {
    console.log("response fail error......")
    return Promise.reject(err);
}

jwtAxios.interceptors.request.use(beforeReq, requestFail)
jwtAxios.interceptors.response.use(beforeRes, responseFail)
export default jwtAxios