import { useParams } from "react-router-dom";
import ReadComponent from "../../../components/ShowManager/ActorShow/ReadComponent";

// 배우-공연 상세 페이지
const ActorShowReadPage = () => {
    const {actorNo} = useParams()
    const {showInfoId} = useParams()

    return (
        <div className="p-4 w-full bg-white">
            <div className="text-3xl font-extrabold">배우-공연 상세 페이지</div>
            <ReadComponent actorNo = {actorNo} showInfoId={showInfoId} />
        </div>
    );
}

export default ActorShowReadPage;