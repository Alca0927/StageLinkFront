import { useParams } from "react-router-dom";
import ReadComponent from "../../../components/NoticeManager/Notices/ReadComponent";

// 공지사항 상세 페이지
const NoticeDetail = () => {
    const {noticeNo} = useParams()

    return (
        <div className="p-4 w-full bg-white">
            <div className="text-3xl font-extrabold">공지사항 상세 페이지</div>
            <ReadComponent noticeNo = {noticeNo} />
        </div>
    );
}

export default NoticeDetail;