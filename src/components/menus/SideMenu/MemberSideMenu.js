import { Link, useLocation } from "react-router-dom";

const MemberSideMenu = () => {
  const location = useLocation();

  const linkClass = (path) =>
    `font-bold px-2 py-1 rounded transition ${
      location.pathname.includes(path)
        ? "bg-blue-700 text-white"
        : "text-white hover:text-yellow-300"
    }`;

  return (
    <div className="flex flex-col space-y-2">
      <Link to="/admin/membermanager/members/list" className={linkClass("members")}>
        회원 목록
      </Link>
      <Link to="/admin/membermanager/reports/list" className={linkClass("reports")}>
        신고 목록
      </Link>
    </div>
  );
};

export default MemberSideMenu;
