import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const BasicMenu = () => {
    const loginState = useSelector(state => state.loginSlice)
    return (
        <div className="flex">
            <div className="w-full bg-orange-500">
                <ul className="flex float-right gap-5">
                    <li className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    <Link to= {'/'}>Main</Link>
                    </li>
                    { loginState.username ?
                    <>
                    <li class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        <Link to= {'/admin/membermanager'}>회원 관리</Link>
                    </li>
                    <li className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        <Link to= {'/admin/showmanager'}>공연 관리</Link>
                    </li>
                    <li className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        <Link to= {'/admin/notice'}>공지</Link>
                    </li>
                    <li className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        <Link to= {'/admin/registermanager'}>예매 관리</Link>
                    </li>
                    <li className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        <Link to= {'/admin/statistic'}>통계</Link>
                    </li>
                    <li className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        <Link to= {'/s/logout'}>로그아웃</Link>
                    </li>
                    </>
                    :<>
                    <li className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        <Link to={'/s/login'}>로그인</Link>
                    </li>
                    </>
                    }
                </ul>
            </div>
        </div>
    );
}

export default BasicMenu;