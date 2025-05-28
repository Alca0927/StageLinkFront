import { useParams } from "react-router-dom";
import ReadComponent from "../../../components/MemberManager/Reports/ReadComponent";

const ReportReadPage = () => {
    const {reportNo} = useParams()

    return (
        <div className="p-4 w-full bg-white">
            <div>신고 상세 페이지</div>
            <ReadComponent reportNo = {reportNo}></ReadComponent>
        </div>
    );
}

export default ReportReadPage;