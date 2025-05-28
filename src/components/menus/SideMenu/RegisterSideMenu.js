import { Link, useLocation } from "react-router-dom";

const RegisterSideMenu = () => {
  const location = useLocation();

  const linkClass = (path: string) =>
    `font-bold px-2 py-1 rounded transition ${
      location.pathname.includes(path)
        ? "bg-blue-700 text-white"
        : "text-white hover:text-yellow-300"
    }`;

  return (
    <div className="flex flex-col space-y-2">
      <Link to="/admin/registermanager/reservation/list" className={linkClass("reservation")}>
        예매 내역 목록
      </Link>
      <Link to="/admin/registermanager/refund/list" className={linkClass("refund")}>
        환불 내역 목록
      </Link>
    </div>
  );
};

export default RegisterSideMenu;
