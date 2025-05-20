import { Link } from "react-router-dom";

const NoticeSideMenu = () => {
    return (
        <div className="flex flex-col space-y-2">
            <Link to="/admin/noticemanager/notices/list" className="font-bold">공지 목록</Link>
            <Link to="/admin/noticemanager/Q&A/list" className="font-bold">Q&A 등록</Link>
        </div>
    );
};

export default NoticeSideMenu;