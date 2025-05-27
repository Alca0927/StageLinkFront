import { useParams } from "react-router-dom";
import ReadComponent from "../../../components/RegisterManager/Reservation/ReadComponent";

const ReservationReadPage = () => {
    const {reservationNo} = useParams()

    return (
        <div className="p-4 w-full bg-white">
            <div>Reservation Read Page</div>
            <ReadComponent reservationNo = {reservationNo}></ReadComponent>
        </div>
    );
}

export default ReservationReadPage;