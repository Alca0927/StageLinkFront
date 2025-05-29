import { useParams } from "react-router-dom";
import ReadComponent from "../../../components/RegisterManager/Refund/ReadComponent";

const RefundReadPage = () => {
    const {refundNo} = useParams()

    return (
        <div className="p-4 w-full bg-white">
            <div>Refund Read Page</div>
            <ReadComponent refundNo = {refundNo}></ReadComponent>
        </div>
    );
}

export default RefundReadPage;