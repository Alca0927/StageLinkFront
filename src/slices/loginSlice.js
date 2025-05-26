import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginPost } from "../api/loginApi";
import { getCookie, setCookie, removeCookie } from "../util/cookieUtil";

// 초기 상태
const initState = {
  email: '',
  roles: []
};

// ✅ 로컬 스토리지와 쿠키에서 상태 복원
const loadMemberFromStorage = () => {
  const token = localStorage.getItem("accessToken");
  const login = getCookie("login");

  if (token && login && login.email) {
    return {
      email: decodeURIComponent(login.email),
      roles: login.roles || []
    };
  }

  return initState;
};

// 로그인 비동기 처리
export const loginPostAsync = createAsyncThunk('loginPostAsync', (param) => {
  return loginPost(param);
});

const loginSlice = createSlice({
  name: 'LoginSlice',
  initialState: loadMemberFromStorage(),
  reducers: {
    login: (state, action) => {
      const data = action.payload;
      return { email: data.email, roles: data.roles || [] };
    },
    logout: () => {
      removeCookie("login");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      return { ...initState };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginPostAsync.fulfilled, (state, action) => {
        const payload = action.payload;
        if (!payload.error) {
          setCookie("login", JSON.stringify(payload), 1);

          localStorage.setItem("accessToken", payload.accessToken);
          localStorage.setItem("refreshToken", payload.refreshToken);

          return {
            email: payload.username,
            roles: payload.roles || []
          };
        }
        return state;
      })
      .addCase(loginPostAsync.pending, () => {
        console.log("로그인 처리중...");
      })
      .addCase(loginPostAsync.rejected, () => {
        console.log("로그인 실패...");
      });
  }
});

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;
