import { useEffect, useState } from "react";
import { getOne } from "../../../api/reservationApi";
import useCustomMove from "../../../hooks/useCustomMove";

const initState = {
    reservationNo: 0,
    member: "",
    show: "",
    seat: "",
    reservationDate:"",
    status : 0
}

const ReadComponent = ({reservationNo}) => {
    const [reservation, setReservation] = useState(initState)
    const {moveToList} = useCustomMove()

    useEffect(() => {
        console.log("Received reservationNo:", reservationNo);
        if (reservationNo) {
            getOne(reservationNo).then(data => {
                console.log(data);
                setReservation(data);
            }).catch(error => {
                console.error("Error fetching reservation:", error);
            });
        } else {
            console.error("reservationNo is invalid:", reservationNo);
        }
    }, [reservationNo]);

    return (
        <div className="max-w-3xl mx-auto mt-10 bg-white shadow-md rounded-lg p-8 border border-gray-300">
            <h2 className="text-2xl font-bold text-blue-600 mb-6">예약 상세</h2>

            {makeDiv('예약번호', reservation.reservationNo)}
            
            {/* member 정보를 보기 좋게 표시 */}
            {reservation.member && typeof reservation.member === 'object' ? (
                <>
                    {makeDiv('회원명', reservation.member.name)}
                    {makeDiv('회원ID', reservation.member.userId)}
                    {makeDiv('이메일', reservation.member.userEmail)}
                </>
            ) : (
                makeDiv('회원정보', reservation.member)
            )}
            
            {/* show 정보도 마찬가지로 처리 */}
            {reservation.show && typeof reservation.show === 'object' ? (
                <>
                    {makeDiv('공연명', reservation.show.showInfo?.showName || reservation.show.name)}
                    {makeDiv('공연장소', reservation.show.showInfo?.showLocation?.locationName)}
                    {makeDiv('공연일시', reservation.show.showStartTime)}
                </>
            ) : (
                makeDiv('공연정보', reservation.show)
            )}
            
            {makeDiv('좌석등급', reservation.seat?.seatClass)}
            {makeDiv('좌석번호', reservation.seat?.seatNumber)}
            {makeDiv('예약일자', reservation.reservationDate)}
            {makeDiv('예약상태', reservation.status)}
            
            <div className="flex justify-end mt-10">
                <button 
                    type="button" 
                    className="px-6 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded" 
                    onClick={() => moveToList(null, "reservation")}
                >
                    목록
                </button>
            </div>
        </div>
    );
}

const makeDiv = (title, value) => {
    // 값이 객체인 경우 JSON 문자열로 변환하거나 적절히 처리
    const displayValue = typeof value === 'object' && value !== null ? 
        JSON.stringify(value, null, 2) : (value || '-');
    
    return (
        <div className="flex items-center py-4 border-b">
            <div className="w-1/4 text-right pr-4 font-bold text-gray-700">{title}</div>
            <div className="w-3/4 bg-gray-100 p-3 rounded shadow-sm text-gray-900 font-medium border border-gray-300">
                {title === '회원정보' || title === '공연정보' ? (
                    <pre className="whitespace-pre-wrap text-sm">{displayValue}</pre>
                ) : (
                    displayValue
                )}
            </div>
        </div>
    );
}

export default ReadComponent