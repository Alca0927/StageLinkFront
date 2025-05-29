import { useParams } from "react-router-dom";
import ReadComponent from "../../../components/NoticeManager/Notices/ReadComponent";

const NoticeDetail = () => {
    const {noticeNo} = useParams()

    return (
        <div className="p-4 w-full bg-white">
            <div>공지사항 상세 페이지</div>
            <ReadComponent noticeNo = {noticeNo}></ReadComponent>
        </div>
    );
}

export default NoticeDetail;