import { useParams } from "react-router-dom";
import ModifyComponent from "../../../components/ShowManager/Location/ModifyCompoent";

// 장소 수정 페이지
// 삭제 됨
const LocationModifyPage = () => {
  const {showlocation} = useParams()
  
  return (
    <div className="p-4 w-full bg-white">
      <div className="text-3xl font-extrabold">장소 수정 페이지</div> 
      <ModifyComponent showlocation={showlocation}/>
    </div>
  );
}

export default LocationModifyPage;