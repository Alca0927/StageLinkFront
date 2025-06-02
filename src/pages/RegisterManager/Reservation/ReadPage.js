import { useParams } from "react-router-dom";
import ReadComponent from "../../../components/RegisterManager/Reservation/ReadComponent";

// 예약 상세 페이지
const ReservationReadPage = () => {
    const {reservationNo} = useParams()

    return (
        <div className="p-4 w-full bg-white">
            <div className="text-3xl font-extrabold">예약 상세 페이지</div>
            <ReadComponent reservationNo = {reservationNo} />
        </div>
    );
}

export default ReservationReadPage;