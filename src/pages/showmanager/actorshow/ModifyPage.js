import { useParams } from "react-router-dom";
import ModifyComponent from "../../../components/ShowManager/ActorShow/ModifyComponent";

const ActorShowModifyPage = () => {
    const {actorNo} = useParams()
    const {showInfoId} = useParams()

    return (
        <div className="p-4 w-full bg-white">
    <div className="text-3xl font-extrabold">
      ActorShow Modify Page  
    </div> 

    <ModifyComponent actorNo={actorNo} showInfoId={showInfoId}/>

  </div>
    );
}

export default ActorShowModifyPage;