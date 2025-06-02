import { useParams } from "react-router-dom";
import ModifyComponent from "../../../components/ShowManager/Show/ModifyComponent";

// 공연 수정 페이지
const ShowModifyPage = () => {
  const {showNo} = useParams()
  
  return (
    <div className="p-4 w-full bg-white">
      <div className="text-3xl font-extrabold"> 공연 수정 페이지</div> 
      <ModifyComponent showNo={showNo}/>
    </div>
  );
}

export default ShowModifyPage;