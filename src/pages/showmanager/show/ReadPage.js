import { useParams } from "react-router-dom";
import ReadComponent from "../../../components/ShowManager/Show/ReadComponent";

const ShowReadPage = () => {
    const {showNo} = useParams()

    return (
        <div className="p-4 w-full bg-white">
            <div>Show Read Page</div>
            <ReadComponent showNo = {showNo}></ReadComponent>
        </div>
    );
}

export default ShowReadPage;