import { useParams } from "react-router-dom";
import ModifyComponent from "../../../components/ShowManager/Actor/ModifyComponent";


// 배우 수정 페이지 
// 삭제 됨
const ActorModifyPage = () => {
  const {actorNo} = useParams()
  
  return (
    <div className="p-4 w-full bg-white">
      <div className="text-3xl font-extrabold">배우 수정 페이지</div> 
      <ModifyComponent actorNo={actorNo}/>
    </div>
  );
}

export default ActorModifyPage;