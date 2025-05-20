import { Link } from "react-router-dom";

const MemberSideMenu = () => {
    return (
        <div className="flex flex-col space-y-2">
            <Link to="/admin/membermanager/members/list" className="font-bold">회원 목록</Link>
            <Link to="/admin/membermanager/reports/list" className="font-bold">신고 목록</Link>
        </div>
    );
};

export default MemberSideMenu;