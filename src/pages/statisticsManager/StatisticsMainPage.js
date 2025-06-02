import BasicLayout from "../../layouts/BasicLayout";
import { Outlet, useLocation } from "react-router-dom";
import StatMainComponent from "../../components/StatisticsManger/statMainComponent";

const StatisticsMainPage = () => {
    const location = useLocation();
    return (
        <BasicLayout>
            {location.pathname === "/admin/statisticsmanager" ? 
            <StatMainComponent/>
            :
            <Outlet/>
            }
        </BasicLayout>
    );
}

export default StatisticsMainPage;