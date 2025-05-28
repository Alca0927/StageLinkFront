import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import RemainingTimeBanner from "../RemainingTimeBanner";

const BasicMenu = () => {
  const loginState = useSelector(state => state.login);  // ✅ login으로 접근
  const username = loginState?.username;
  const roles = loginState?.roles || [];

  console.log("🚨 [DEBUG] BasicMenu 렌더링됨");
console.log("🧠 Redux 상태:", loginState);
console.log("🧠 username:", loginState?.username);


  return (
    <div className="w-full bg-blue-900 py-5 px-5">
      <div className="flex justify-between items-center">
        <div className="text-white font-semibold">
          <RemainingTimeBanner />
        </div>

        <ul className="flex gap-3">
          {username && (
            <>
              <li className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
                <Link to="/main">MAIN</Link>
              </li>
              <li className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
                <Link to="/admin/membermanager">회원 관리</Link>
              </li>
              <li className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
                <Link to="/admin/showmanager">공연 관리</Link>
              </li>
              <li className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
                <Link to="/admin/noticemanager">공지 및 Q&A</Link>
              </li>
              <li className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
                <Link to="/admin/registermanager">예매 관리</Link>
              </li>
              <li className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
                <Link to="/admin/statistic">통계</Link>
              </li>
              <li className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
                <Link to="/s/logout">로그아웃</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default BasicMenu;
