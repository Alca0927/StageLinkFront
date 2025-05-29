import { useParams } from "react-router-dom";
import ReadComponent from "../../../components/ShowManager/Actor/ReadComponent";

const ActorReadPage = () => {
    const {actorNo} = useParams()

    return (
        <div className="p-4 w-full bg-white">
            <div>배우 상세 페이지</div>
            <ReadComponent actorNo = {actorNo}></ReadComponent>
        </div>
    );
}

export default ActorReadPage;