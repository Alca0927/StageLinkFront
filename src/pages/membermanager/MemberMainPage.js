import BasicLayout from "../../layouts/BasicLayout";
import { Outlet,useLocation  } from "react-router-dom";
import MemberMainComponent from "../../components/MemberManager/MemberMainComponent";

// 회원 관리 메인 페이지
const ShowMMemberMainPageainPage = () => {
  const location = useLocation();

  return (
    <BasicLayout>
        {location.pathname === "/admin/membermanager" ? 
        <MemberMainComponent /> 
        : 
        <Outlet />}
    </BasicLayout>
  );
}

export default ShowMMemberMainPageainPage;