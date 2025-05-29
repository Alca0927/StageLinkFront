import { useEffect, useState } from "react";
import { getOne } from "../../../api/refundApi";
import useCustomMove from "../../../hooks/useCustomMove";

const initState = {
    refundNo: 0,
    member: "",
    reservation: "",
    seat: "",
    refundDate:""
}

const ReadComponent = ({refundNo}) => {
    const [refund, setRefund] = useState(initState)
    const {moveToList} = useCustomMove()

    useEffect(() => {
        console.log("Received showlocation:", refundNo);
        if (refundNo) {
            getOne(refundNo).then(data => {
                console.log(data);
                setRefund(data);
            }).catch(error => {
            console.error("Error fetching refund:", error);
            });
        } else {
            console.error("refundNo is invalid:", refundNo);
        }
    }, [refundNo]);

    return (
        <div className="border-2 border-sky-200 mt-10 m-2 p-4">
            {makeDiv('환불 번호', refund.refundNo)}
            {makeDiv('고객 번호', refund.member.memberNo)}
            {makeDiv('예매 번호', refund.reservation.reservationNo)}
            {makeDiv('좌석 ID', refund.seat.seatId)}
            {makeDiv('좌석 클래스', refund.seat.seatClass)}
            {makeDiv('좌석 번호', refund.seat.seatNumber)}
            {makeDiv('환불 일자', refund.refundDate)}

            {/* 버튼 */}
            <div className="flex justify-end p-4">
                <button type="button" className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500" onClick={(pageParam) => moveToList(pageParam, "refund")}>목록</button>
            </div>
        </div>
    );
}

const makeDiv = (title, value) => 
    <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
            <div className="w-1/5 p-6 text-right font-bold">{title}</div>
            <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">{value}</div>
        </div>
    </div>


export default ReadComponent