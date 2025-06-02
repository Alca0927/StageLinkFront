import { useParams } from "react-router-dom";
import ReadComponent from "../../../components/MemberManager/Members/ReadComponent";

// 회원 상세 페이지
const MemberReadPage = () => {
    const {memberNo} = useParams()

    return (
        <div className="p-4 w-full bg-white">
            <div className="text-3xl font-extrabold">회원 상세 페이지</div>
            <ReadComponent memberNo = {memberNo} />
        </div>
    );
}

export default MemberReadPage;