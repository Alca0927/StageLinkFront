import { useDispatch, useSelector } from "react-redux";
import { Navigate, createSearchParams, useNavigate } from "react-router-dom";
import { loginPostAsync, logout, login } from "../slices/loginSlice";

const useCustomLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginState = useSelector(state => state.login || {});
  const isLogin = !!loginState.username;

  // ✅ 로그인 함수 - username 사용
  const doLogin = async (loginParam) => {
    const action = await dispatch(loginPostAsync(loginParam));
    const data = action.payload;

    if (data) {
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);

      dispatch(login({
        username: data.username, // ✅ 변경됨
        roles: data.roles
      }));
    } else {
      console.warn("❗ 로그인 응답에 유효한 토큰이 없습니다.");
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
    const errorMsg = ex?.response?.data?.error || "UNKNOWN";
    const errorStr = createSearchParams({ error: errorMsg }).toString();

    if (errorMsg === 'REQUIRE_LOGIN') {
      alert("로그인이 필요합니다.");
      navigate({ pathname: '/member/login', search: errorStr });
      return;
    }

    if (errorMsg === 'ERROR_ACCESSDENIED') {
      alert("해당 메뉴에 대한 권한이 없습니다.");
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
