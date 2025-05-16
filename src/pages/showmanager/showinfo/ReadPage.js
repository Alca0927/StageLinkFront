import { useParams } from "react-router-dom";
import ReadComponent from "../../../components/ShowManager/ShowInfo/ReadComponent";

const ShowReadPage = () => {
    const {showInfo} = useParams()

    return (
        <div className="p-4 w-full bg-white">
            <div>ShowInfo Read Page</div>
            <ReadComponent showInfo = {showInfo}></ReadComponent>
        </div>
    );
}

export default ShowReadPage;