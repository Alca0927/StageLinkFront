import { useParams } from "react-router-dom";
import ModifyComponent from "../../../components/ShowManager/Actor/ModifyComponent";

const ActorModifyPage = () => {
    const {actorNo} = useParams()
    
    return (
        <div className="p-4 w-full bg-white">
    <div className="text-3xl font-extrabold">
      Actor Modify Page  
    </div> 

    <ModifyComponent actorNo={actorNo}/>

  </div>
    );
}

export default ActorModifyPage;