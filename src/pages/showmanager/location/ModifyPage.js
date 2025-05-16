import { useParams } from "react-router-dom";
import ModifyComponent from "../../../components/ShowManager/Location/ModifyCompoent";

const LocationModifyPage = () => {
    const {showlocation} = useParams()
    
    return (
        <div className="p-4 w-full bg-white">
    <div className="text-3xl font-extrabold">
      Location Modify Page  
    </div> 

    <ModifyComponent showlocation={showlocation}/>

  </div>
    );
}

export default LocationModifyPage;