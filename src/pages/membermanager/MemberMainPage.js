import BasicLayout from "../../layouts/BasicLayout";
import { Outlet } from "react-router-dom";

const memberMainPage = () => {
    return (
        <BasicLayout>
            <div>member Main Page</div>
            <Outlet/>
        </BasicLayout>
    );
}

export default memberMainPage;