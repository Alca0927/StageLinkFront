import { useParams } from "react-router-dom";
import ReadComponent from "../../../components/MemberManager/Reports/ReadComponent";

// 신고 상세 페이지
const ReportReadPage = () => {
    const {reportNo} = useParams()

    return (
        <div className="p-4 w-full bg-white">
            <div className="text-3xl font-extrabold">신고 상세 페이지</div>
            <ReadComponent reportNo = {reportNo} />
        </div>
    );
}

export default ReportReadPage;