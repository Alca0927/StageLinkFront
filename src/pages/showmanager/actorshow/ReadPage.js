import { useParams } from "react-router-dom";
import ReadComponent from "../../../components/ShowManager/ActorShow/ReadComponent";

const ActorShowReadPage = () => {
    const {actorNo} = useParams()
    const {showInfoId} = useParams()

    return (
        <div className="p-4 w-full bg-white">
            <div>ActorShow Read Page</div>
            <ReadComponent actorNo = {actorNo} showInfoId={showInfoId}></ReadComponent>
        </div>
    );
}

export default ActorShowReadPage;