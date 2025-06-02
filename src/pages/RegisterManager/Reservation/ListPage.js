import ListComponent from "../../../components/RegisterManager/Reservation/ListComponent";

// 예약 목록 페이지
const ReservationListPage = () => {
    return (
        <div className="p-4 w-full bg-white">
            <div className="text-3xl font-extrabold">예약 목록 페이지</div>
            <ListComponent/>
        </div>
    );
}

export default ReservationListPage;