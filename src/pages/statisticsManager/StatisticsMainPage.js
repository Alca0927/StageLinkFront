import BasicLayout from "../../layouts/BasicLayout";
import { Outlet, useLocation } from "react-router-dom";
import StatMainComponent from "../../components/StatisticsManger/statMainComponent";

// 통계 메인 페이지
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