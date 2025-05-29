import BasicLayout from "../../layouts/BasicLayout";
import { Outlet } from "react-router-dom";

const ShowMainPage = () => {
    return (
        <BasicLayout>
            <div>공연 관리 페이지</div>
            <Outlet/>
        </BasicLayout>
    );
}

export default ShowMainPage;