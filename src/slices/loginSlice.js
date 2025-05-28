import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginPost } from "../api/loginApi";
import { getCookie, setCookie, removeCookie } from "../util/cookieUtil";

// 초기 상태
const initState = {
  username: '',
  roles: []
};

// 로컬 저장소에서 사용자 정보 불러오기
const loadMemberFromStorage = () => {
  const token = localStorage.getItem("accessToken");
  const login = getCookie("login");

  if (token && login && login.username) {
    return {
      username: decodeURIComponent(login.username),
      roles: login.roles || []
    };
  }

  return initState;
};

// 비동기 로그인 액션
export const loginPostAsync = createAsyncThunk(
  'loginPostAsync',
  (param) => loginPost(param)
);

// 로그인 슬라이스
const loginSlice = createSlice({
  name: 'LoginSlice',
  initialState: loadMemberFromStorage(),
  reducers: {
    login: (state, action) => {
      const data = action.payload;
      return {
        username: data.username,
        roles: data.roles || []
      };
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
          const accessToken = payload.accessToken;
          const refreshToken = payload.refreshToken;

          
          // ✅ 토큰 유효성 검사 후 저장
          if (accessToken && refreshToken) {
            setCookie("login", JSON.stringify({
              username: payload.username,  // ✅ username 사용
              roles: payload.roles
            }), 1);

            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);

            return {
              username: payload.username,  // ✅ username 사용
              roles: payload.roles || []
            };
          } else {
            console.error("❗ 로그인 응답에 유효한 토큰이 없습니다.");
            alert("로그인 실패: 서버에서 토큰을 받지 못했습니다.");
          }
        }

        return state; // 에러 또는 조건 불충족 시 기존 상태 유지
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
