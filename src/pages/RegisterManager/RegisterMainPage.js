import RegisterMainComponent from "../../components/RegisterManager/RegisterMainComponent";
import BasicLayout from "../../layouts/BasicLayout";
import { Outlet, useLocation } from "react-router-dom";

// 예매 관리 메인 페이지
const RegisterMainPage = () => {
    const location = useLocation();

    return (
        <BasicLayout>
            { location.pathname === "/admin/registermanager" ?
            <RegisterMainComponent/>
            :
            <Outlet/>
            }
        </BasicLayout>
    );
}

export default RegisterMainPage;