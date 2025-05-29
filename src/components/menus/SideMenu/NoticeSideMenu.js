import { Link, useLocation } from "react-router-dom";

const NoticeSideMenu = () => {
  const location = useLocation();

  const linkClass = (path) =>
    `font-bold px-2 py-1 rounded transition ${
      location.pathname.includes(path)
        ? "bg-blue-700 text-white"
        : "text-white hover:text-yellow-300"
    }`;

  return (
    <div className="flex flex-col space-y-2">
      <Link to="/admin/noticemanager/notices/list" className={linkClass("notices/list")}>
        공지 목록
      </Link>
      <Link to="/admin/noticemanager/notices/register" className={linkClass("notices/register")}>
        공지 등록
      </Link>
      <Link to="/admin/noticemanager/Q&A/list" className={linkClass("Q&A/list")}>
        Q&A 목록
      </Link>
    </div>
  );
};

export default NoticeSideMenu;
