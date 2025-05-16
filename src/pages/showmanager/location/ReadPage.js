import { useParams } from "react-router-dom";
import ReadComponent from "../../../components/ShowManager/Location/ReadComponent";

const ShowReadPage = () => {
    const {showlocation} = useParams()

    return (
        <div className="p-4 w-full bg-white">
            <div>Location Read Page</div>
            <ReadComponent showlocation = {showlocation}></ReadComponent>
        </div>
    );
}

export default ShowReadPage;