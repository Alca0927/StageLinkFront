import { useParams } from "react-router-dom";
import ModifyComponent from "../../../components/ShowManager/ActorShow/ModifyComponent";

// 배우-공연 수정 페이지
// 삭제 됨
const ActorShowModifyPage = () => {
  const {actorNo} = useParams()
  const {showInfoId} = useParams()

  return (
    <div className="p-4 w-full bg-white">
      <div className="text-3xl font-extrabold">배우-공연 수정 페이지</div>
      <ModifyComponent actorNo={actorNo} showInfoId={showInfoId}/>
    </div>
  );
}

export default ActorShowModifyPage;