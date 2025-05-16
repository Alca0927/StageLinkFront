import { useParams } from "react-router-dom";
import ReadComponent from "../../../components/RegisterManager/Refund/ReadComponent";

const RefundReadPage = () => {
    const {showlocation} = useParams()

    return (
        <div className="p-4 w-full bg-white">
            <div>Refund Read Page</div>
            <ReadComponent showlocation = {showlocation}></ReadComponent>
        </div>
    );
}

export default RefundReadPage;