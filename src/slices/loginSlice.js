import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginPost } from "../api/loginApi";
import { getCookie,setCookie, removeCookie } from "../util/cookieUtil";

const initState = {
    email: ''
}

const loadMemberCookie = () => {
    const login = getCookie("login")
    if(login && login.email){
        login.email = decodeURIComponent(login.email)
    }
    return login
}

export const loginPostAsync = createAsyncThunk('loginPostAsync', (param) => {
    return loginPost(param)
})

const loginSlice = createSlice({
    name: 'LoginSlice',
    initialState: loadMemberCookie() || initState,
    reducers: {
        login:(state, action) => {
            console.log("로그인....")
            const data = action.payload
            
            return { email: data.email}
        },
        logout:(state, action) => {
            console.log("로그아웃...")
            removeCookie("login")
            return {...initState}
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginPostAsync.fulfilled, (state, action) => {
            console.log("fulfilled : 완료")

            const payload = action.payload
            if(!payload.error){
                console.log("쿠키 저장")
                setCookie("login", JSON.stringify(payload),1)
            }
            return payload
        })
        .addCase(loginPostAsync.pending, (state, action) => {
            console.log("pending : 처리중")
        })
        .addCase(loginPostAsync.rejected, (state, action) => {
            console.log("rejected : 오류")
        })
    }
})

export const {login, logout} = loginSlice.actions
export default loginSlice.reducer