import BasicLayout from "../../layouts/BasicLayout";
import { Outlet,useLocation  } from "react-router-dom";
import MemberMainComponent from "../../components/MemberManager/MemberMainComponent";

const ShowMMemberMainPageainPage = () => {
  const location = useLocation();
  const path = location.pathname;

  const isNestedPath = path.includes('members') || path.includes('reports');
  return (
    <BasicLayout>
        <div>회원 관리 페이지</div>
        {isNestedPath ? <Outlet /> : <MemberMainComponent />}
    </BasicLayout>
  );
}

export default ShowMMemberMainPageainPage;