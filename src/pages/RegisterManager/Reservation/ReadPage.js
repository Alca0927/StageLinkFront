import { useParams } from "react-router-dom";
import ReadComponent from "../../../components/RegisterManager/Reservation/ReadComponent";

const ReservationReadPage = () => {
    const {showlocation} = useParams()

    return (
        <div className="p-4 w-full bg-white">
            <div>Reservation Read Page</div>
            <ReadComponent showlocation = {showlocation}></ReadComponent>
        </div>
    );
}

export default ReservationReadPage;