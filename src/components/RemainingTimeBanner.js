import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

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

const RemainingTimeBanner = () => {
  const [remainingMs, setRemainingMs] = useState(null);
  const [showExtendBtn, setShowExtendBtn] = useState(false);
  const alertShownRef = useRef(false);
  const navigate = useNavigate();
  const loginState = useSelector(state => state.login); // ✅ 수정: 정확한 reducer key 사용
  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    if (!accessToken) return;

    const updateRemainingTime = () => {
      const payload = parseJwt(accessToken);
      if (!payload || !payload.exp) {
        setRemainingMs(null);
        return;
      }

      const expTime = payload.exp * 1000;
      const now = Date.now();
      const diff = expTime - now;

      if (diff <= 0) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        navigate('/s/login');
      } else {
        setRemainingMs(diff);

        if (diff <= 2 * 60 * 1000 && !alertShownRef.current) {
          alert('2분 후 자동 로그아웃됩니다. 로그인 연장을 원하시면 버튼을 눌러주세요.');
          alertShownRef.current = true;
          setShowExtendBtn(true);
        }
      }
    };

    updateRemainingTime();
    const interval = setInterval(updateRemainingTime, 1000);
    return () => clearInterval(interval);
  }, [accessToken, navigate]);

  const handleExtendLogin = async () => {
    try {
      const res = await fetch('/admin/api/login/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          refreshToken: localStorage.getItem('refreshToken'),
        }),
      });

      if (!res.ok) throw new Error('연장 실패');

      const data = await res.json();
      if (!data.accessToken || !data.refreshToken) throw new Error('응답에 토큰 없음');

      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);

      alertShownRef.current = false;
      setShowExtendBtn(false);
      setRemainingMs(null);
    } catch (err) {
      alert('로그인 연장 실패. 다시 로그인해 주세요.');
      setTimeout(() => navigate('/s/login'), 1000);
    }
  };

  // ❗ 방어적 조건 렌더링
  if (!loginState?.username || !accessToken || remainingMs === null) return null;

  const minutes = Math.floor(remainingMs / 60000);
  const seconds = Math.floor((remainingMs % 60000) / 1000);

  return (
    <div className="flex items-center space-x-3 text-white font-bold text-sm">
      <span>
        ⏳로그아웃까지 {minutes}분 {seconds < 10 ? '0' : ''}{seconds}초 남음
      </span>
      {showExtendBtn && (
        <button
          onClick={handleExtendLogin}
          className="bg-yellow-400 text-black px-2 py-1 rounded hover:bg-yellow-500"
        >
          로그인 연장하기
        </button>
      )}
    </div>
  );
};

export default RemainingTimeBanner;
