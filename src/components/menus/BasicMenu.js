import { Link } from "react-router-dom";

const BasicMenu = () => {
    return (
        <div className="flex">
            <div className="w-full bg-orange-500">
                <ul className="flex float-right gap-5">
                    <li className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    <Link to= {'/'}>Main</Link>
                    </li>
                    <li className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    <Link to= {'/members'}>회원 관리</Link>
                    </li>
                    <li className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    <Link to= {'/showmanager'}>공연 관리</Link>
                    </li>
                    <li className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    <Link to= {'/notice'}>공지</Link>
                    </li>
                    <li className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    <Link to= {'/registermanager'}>예매 관리</Link>
                    </li>
                    <li className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    <Link to= {'/statistic'}>통계</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default BasicMenu;