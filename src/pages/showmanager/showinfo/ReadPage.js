import { useParams } from "react-router-dom";
import ReadComponent from "../../../components/ShowManager/ShowInfo/ReadComponent";

// 공연 정보 상세 페이지 
const ShowReadPage = () => {
    const {showInfo} = useParams()

    return (
        <div className="p-4 w-full bg-white">
            <div className="text-3xl font-extrabold">공연 정보 상세 페이지 </div>
            <ReadComponent showInfo = {showInfo} />
        </div>
    );
}

export default ShowReadPage;