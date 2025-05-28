import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import root from './router/root';
import { login } from './slices/loginSlice'; // Redux 액션

function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}

const AppInitializer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    if (token) {
      try {
        const payload = parseJwt(token);
        const isExpired = payload?.exp * 1000 < Date.now();

        if (!payload || isExpired) {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          console.log('⛔ 만료되었거나 잘못된 토큰이 제거되었습니다.');
        } else {
          const autoLoginEnabled = localStorage.getItem('autoLogin') === 'true';

          // ✅ sub → username 으로 사용
          if (payload.username && autoLoginEnabled) {
            dispatch(login({
              username: payload.username,
              roles: payload.roles || []
            }));
            console.log("✅ 자동 로그인 상태 복원:", payload.username);
          }
        }
      } catch (e) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        console.log('⛔ 토큰 파싱 실패로 제거됨.');
      }
    }
  }, [dispatch]);

  return null;
};

const App = () => {
  return (
    <>
      <AppInitializer />
      <RouterProvider router={root} />
    </>
  );
};

export default App;
