import BasicLayout from "../../layouts/BasicLayout";
import { Outlet } from "react-router-dom";

const ShowMainPage = () => {
    return (
        <BasicLayout>
            <div>Show Main Page</div>
            <Outlet/>
        </BasicLayout>
    );
}

export default ShowMainPage;