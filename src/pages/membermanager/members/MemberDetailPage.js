import { useParams } from "react-router-dom";
import ReadComponent from "../../../components/MemberManager/Members/ReadComponent";

const MemberReadPage = () => {
    const {memberNo} = useParams()

    return (
        <div className="p-4 w-full bg-white">
            <div>회원 상세 페이지</div>
            <ReadComponent memberNo = {memberNo}></ReadComponent>
        </div>
    );
}

export default MemberReadPage;