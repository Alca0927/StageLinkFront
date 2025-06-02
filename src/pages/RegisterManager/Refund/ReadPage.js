import { useParams } from "react-router-dom";
import ReadComponent from "../../../components/RegisterManager/Refund/ReadComponent";

// 환불 상세 페이지
const RefundReadPage = () => {
    const {refundNo} = useParams()

    return (
        <div className="p-4 w-full bg-white">
            <div className="text-3xl font-extrabold">환불 상세 페이지</div>
            <ReadComponent refundNo = {refundNo}/>
        </div>
    );
}

export default RefundReadPage;