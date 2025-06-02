import NoticeMainComponent from "../../components/NoticeManager/NoticeMainComponent";
import BasicLayout from "../../layouts/BasicLayout";
import { Outlet, useLocation } from "react-router-dom";

// 공지 & QnA 메인 페이지
const NoticeMainPage = () => {
    const location = useLocation();
    return (
        <BasicLayout>
            {location.pathname === "/admin/noticemanager" ?
            <NoticeMainComponent/>
            :
            <Outlet/>
            }
        </BasicLayout>
    );
}

export default NoticeMainPage;