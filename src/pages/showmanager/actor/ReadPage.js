import { useParams } from "react-router-dom";
import ReadComponent from "../../../components/ShowManager/Actor/ReadComponent";

// 배우 상세 페이지
const ActorReadPage = () => {
    const {actorNo} = useParams()

    return (
        <div className="p-4 w-full bg-white">
            <div className="text-3xl font-extrabold">배우 상세 페이지</div> 
            <ReadComponent actorNo = {actorNo} />
        </div>
    );
}

export default ActorReadPage;