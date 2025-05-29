import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../slices/loginSlice';
import { parseJwt, isTokenExpired, clearTokens } from '../util/tokenUtils';

const AuthInitializer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    
    if (!token) return;

    try {
      const payload = parseJwt(token);
      
      if (!payload || isTokenExpired(payload)) {
        clearTokens();
        console.log('⛔ 만료되었거나 잘못된 토큰이 제거되었습니다.');
        return;
      }

      const autoLoginEnabled = localStorage.getItem('autoLogin') === 'true';
      
      if (payload.username && autoLoginEnabled) {
        dispatch(login({
          username: payload.username,
          roles: payload.roles || []
        }));
        console.log("✅ 자동 로그인 상태 복원:", payload.username);
      }
    } catch (e) {
      clearTokens();
      console.log('⛔ 토큰 파싱 실패로 제거됨.');
    }
  }, [dispatch]);

  return null;
};

export default AuthInitializer;