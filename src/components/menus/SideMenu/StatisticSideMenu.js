import { Link } from "react-router-dom";

const StatisticSideMenu = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth(); // 0부터 시작 → 1 더해야 함
    const showNo = null;

    return (
        <div className="flex flex-col space-y-2">
            <Link to={`/admin/statisticsmanager/members/${year}/${month}`}>회원 통계</Link>
            <Link to={`/admin/statisticsmanager/sales/${year}/${month}`}>매출 통계</Link>
            <Link to={`/admin/statisticsmanager/register/${showNo}`}>예매 통계</Link>
        </div>
    );
};

export default StatisticSideMenu;
