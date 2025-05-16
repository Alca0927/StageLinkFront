import { useParams } from "react-router-dom";
import ModifyComponent from "../../../components/ShowManager/ShowInfo/ModifyComponent";

const ShowInfoModifyPage = () => {
    const {showInfo} = useParams()
    
    return (
        <div className="p-4 w-full bg-white">
    <div className="text-3xl font-extrabold">
      ShowInfo Modify Page  
    </div> 

    <ModifyComponent showInfo={showInfo}/>

  </div>
    );
}

export default ShowInfoModifyPage;