import { useParams } from "react-router-dom";
import ModifyComponent from "../../../components/ShowManager/ShowInfo/ModifyComponent";

// 공연 정보 수정 페이지
// 삭제됨
const ShowInfoModifyPage = () => {
  const {showInfo} = useParams()
    
  return (
    <div className="p-4 w-full bg-white">
      <div className="text-3xl font-extrabold">공연 정보 수정 페이지</div> 
      <ModifyComponent showInfo={showInfo}/>
    </div>
  );
}

export default ShowInfoModifyPage;