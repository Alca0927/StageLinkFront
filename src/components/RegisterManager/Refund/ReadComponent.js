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
        console.log("Received refundNo:", refundNo);
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
        <div className="max-w-3xl mx-auto mt-10 bg-white shadow-md rounded-lg p-8 border border-gray-300">
            <h2 className="text-2xl font-bold text-blue-600 mb-6">환불 상세</h2>

            {makeDiv('환불번호', refund.refundNo)}
            {makeDiv('고객번호', refund.member?.memberNo || refund.member)}
            {makeDiv('예약번호', refund.reservation?.reservationNo || refund.reservation)}
            {makeDiv('좌석ID', refund.seat?.seatId || refund.seat)}
            {makeDiv('좌석등급', refund.seat?.seatClass)}
            {makeDiv('좌석번호', refund.seat?.seatNumber)}
            {makeDiv('환불일자', refund.refundDate)}

            <div className="flex justify-end mt-10">
                <button 
                    type="button" 
                    className="px-6 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded" 
                    onClick={() => moveToList(null, "refund")}
                >
                    목록
                </button>
            </div>
        </div>
    );
}

const makeDiv = (title, value) => {
    const displayValue = value || '-';
    
    return (
        <div className="flex items-center py-4 border-b">
            <div className="w-1/4 text-right pr-4 font-bold text-gray-700">{title}</div>
            <div className="w-3/4 bg-gray-100 p-3 rounded shadow-sm text-gray-900 font-medium border border-gray-300">
                {displayValue}
            </div>
        </div>
    );
}

export default ReadComponent