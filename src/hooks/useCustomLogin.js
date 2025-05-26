import { useDispatch, useSelector } from "react-redux";
import { Navigate, createSearchParams, useNavigate } from "react-router-dom";
import { loginPostAsync, logout } from "../slices/loginSlice";

const useCustomLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginState = useSelector(state => state.loginSlice); // 로그인 상태
  const isLogin = loginState.email ? true : false; // 로그인 여부

  const doLogin = async (loginParam) => {
    const action = await dispatch(loginPostAsync(loginParam));
    const data = action.payload;

    if (data && data.accessToken) {
      // ✅ JWT 토큰 저장
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
    }

    return data;
  };

  const doLogout = () => {
    dispatch(logout());
  };

  const moveToPath = (path) => {
    navigate({ pathname: path }, { replace: true });
  };

  const moveToLogin = () => {
    navigate({ pathname: '/s/login' }, { replace: true });
  };

  const moveToLoginReturn = () => {
    return <Navigate replace to="/s/login" />;
  };

  const exceptionHandle = (ex) => {
    console.log("Exception------------------------");
    console.log(ex);

    const errorMsg = ex.response.data.error;
    const errorStr = createSearchParams({ error: errorMsg }).toString();

    if (errorMsg === 'REQUIRE_LOGIN') {
      alert("로그인 해야만 합니다.");
      navigate({ pathname: '/member/login', search: errorStr });
      return;
    }

    if (errorMsg === 'ERROR_ACCESSDENIED') {
      alert("해당 메뉴를 사용할 수 있는 권한이 없습니다.");
      navigate({ pathname: '/member/login', search: errorStr });
      return;
    }
  };

  return {
    loginState,
    isLogin,
    doLogin,
    doLogout,
    moveToPath,
    moveToLogin,
    moveToLoginReturn,
    exceptionHandle
  };
};

export default useCustomLogin;
