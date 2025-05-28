import { useState } from "react";
import useCustomLogin from "../../hooks/useCustomLogin";

const initState = {
  username: '',
  pw: ''
};

const LoginComponent = () => {
  const [loginParam, setLoginParam] = useState({ ...initState });
  const [autoLogin, setAutoLogin] = useState(false);

  const { doLogin, moveToPath } = useCustomLogin();

  const handleChange = (e) => {
    setLoginParam({
      ...loginParam,
      [e.target.name]: e.target.value
    });
  };

  const handleCheckbox = (e) => {
    setAutoLogin(e.target.checked);
  };

  const handleClickLogin = (e) => {
    console.log("Login Params:", loginParam);

    // 자동 로그인 여부 저장
    if (autoLogin) {
      localStorage.setItem('autoLogin', 'true');
    } else {
      localStorage.removeItem('autoLogin');
    }

    doLogin(loginParam)
      .then(data => {
        console.log("after unwrap...");
        console.log(data);

        // ✅ 유효한 토큰이 없으면 로그인 실패 처리
        if (data.error || !data.accessToken || !data.refreshToken) {
          alert("로그인 실패: 이메일과 비밀번호를 확인하거나 서버 응답을 점검하세요.");
          return;
        }

        alert("로그인 성공");
        moveToPath('/main');
      })
      .catch(err => {
        console.error("❌ 로그인 중 예외 발생:", err);
        alert("로그인 중 오류가 발생했습니다. 나중에 다시 시도해주세요.");
      });
  };

  return (
    <div className="border-2 border-sky-200 mt-10 m-2 p-4">
      <div className="flex justify-center">
        <div className="text-4xl m-4 p-4 font-extrabold text-blue-500">LOGIN</div>
      </div>

      {/* 이메일 입력 */}
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-full p-3 text-left font-bold">Email</div>
          <input
            className="w-full p-3 rounded-r border border-solid border-neutral-500 shadow-md"
            name="username"
            type="text"
            value={loginParam.username}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* 비밀번호 입력 */}
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-full p-3 text-left font-bold">Password</div>
          <input
            className="w-full p-3 rounded-r border border-solid border-neutral-500 shadow-md"
            name="pw"
            type="password"
            value={loginParam.pw}
            onChange={handleChange}
          />
        </div>
      </div>
      
      {/* 로그인 버튼 */}
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full justify-center">
          <div className="w-2/5 p-6 flex justify-center font-bold">
            <button
              className="rounded p-4 w-36 bg-blue-500 text-xl text-white"
              onClick={handleClickLogin}
            >
              submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
