import { Link, useLocation } from "react-router-dom";

const ShowSideMenu = () => {
  const location = useLocation();

  const linkClass = (path) =>
    `font-bold px-2 py-1 rounded transition ${
      location.pathname.includes(path)
        ? "bg-blue-700 text-white"
        : "text-white hover:text-yellow-300"
    }`;

  return (
    <div className="flex flex-col space-y-2">
      <Link to="/admin/showmanager/show/list" className={linkClass("show/list")}>
        공연 목록
      </Link>
      <Link to="/admin/showmanager/showinfo/list" className={linkClass("showinfo")}>
        공연 상세 목록
      </Link>
      <Link to="/admin/showmanager/location/list" className={linkClass("location")}>
        공연장 목록
      </Link>
      <Link to="/admin/showmanager/actor/list" className={linkClass("actor/list")}>
        배우 목록
      </Link>
      <Link to="/admin/showmanager/actorshow/list" className={linkClass("actorshow")}>
        배우 출연작 목록
      </Link>
    </div>
  );
};

export default ShowSideMenu;
