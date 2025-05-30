import { Link, useLocation } from "react-router-dom";

const StatisticSideMenu = () => {
  const location = useLocation();
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth(); // 0부터 시작 → 1 더해야 함
  const showNo = null;
  
  const linkClass = (path) =>
    `font-bold px-2 py-1 rounded transition ${
      location.pathname.includes(path)
        ? "bg-blue-700 text-white"
        : "text-white hover:text-yellow-300"
    }`;

  return (
    <div className="flex flex-col space-y-2">
      <Link to={`/admin/statisticsmanager/members/${year}/${month}`} className={linkClass("members")}>회원 통계</Link>
      <Link to={`/admin/statisticsmanager/sales/${year}/${month}`} className={linkClass("sales")}>월별 통계</Link>
    </div>
  );
};

export default StatisticSideMenu;
