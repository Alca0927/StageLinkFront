import { Link } from "react-router-dom";

const BasicMenu = () => {
  return (
    <div className="flex">
      <div className="w-full bg-blue-900 py-5 px-5">
        <ul className="flex justify-end gap-3">
          <li className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
            <Link to="/">Main</Link>
          </li>
          <li className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
            <Link to="/admin/membermanager">회원 관리</Link>
          </li>
          <li className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
            <Link to="/showmanager">공연 관리</Link>
          </li>
          <li className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
            <Link to="/admin/noticemanager">공지 및 Q&A</Link>
          </li>
          <li className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
            <Link to="/registermanager">예매 관리</Link>
          </li>
          <li className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
            <Link to="/statistic">통계</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BasicMenu;
