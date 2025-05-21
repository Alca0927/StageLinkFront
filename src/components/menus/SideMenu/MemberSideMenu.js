import { Link } from "react-router-dom";

const MemberSideMenu = () => {
    return (
        <div className="flex flex-col space-y-2">
            <Link to="/admin/showmanager/show/list">공연 목록</Link>
            <Link to="/admin/showmanager/showinfo/list">공연 상세 목록</Link>
            <Link to="/admin/showmanager/location/list">공연장 목록</Link>
            <Link to="/admin/showmanager/actor/list">배우 목록</Link>
        </div>
    );
};

export default MemberSideMenu;
