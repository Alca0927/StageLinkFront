import { useParams } from "react-router-dom";
import ReadComponent from "../../../components/ShowManager/Location/ReadComponent";

// 장소 상세 페이지
const ShowReadPage = () => {
    const {showlocation} = useParams()

    return (
        <div className="p-4 w-full bg-white">
            <div className="text-3xl font-extrabold">장소 상세 페이지</div>
            <ReadComponent showlocation = {showlocation} />
        </div>
    );
}

export default ShowReadPage;