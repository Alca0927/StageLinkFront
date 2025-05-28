import BasicLayout from "../../layouts/BasicLayout";
import { Outlet } from "react-router-dom";

const StatisticsMainPage = () => {
    return (
        <BasicLayout>
            <div>Statistics Main Page</div>
            <Outlet/>
        </BasicLayout>
    );
}

export default StatisticsMainPage;