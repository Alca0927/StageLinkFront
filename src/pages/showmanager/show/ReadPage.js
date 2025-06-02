import { useParams } from "react-router-dom";
import ReadComponent from "../../../components/ShowManager/Show/ReadComponent";

// 공연 상세 페이지
const ShowReadPage = () => {
    const {showNo} = useParams()

    return (
        <div className="p-4 w-full bg-white">
            <div className="text-3xl font-extrabold">공연 상세 페이지</div>
            <ReadComponent showNo = {showNo}/>
        </div>
    );
}

export default ShowReadPage;