import BasicLayout from "../../layouts/BasicLayout";
import { Outlet } from "react-router-dom";

const noticeMainPage = () => {
    return (
        <BasicLayout>
            <div>notice Main Page</div>
            <Outlet/>
        </BasicLayout>
    );
}

export default noticeMainPage