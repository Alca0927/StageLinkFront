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
        <div className="border-2 border-sky-200 mt-10 m-2 p-4">
            {makeDiv('reservationNo', reservation.reservationNo)}
            {/* member 정보를 보기 좋게 표시 */}
            {reservation.member && typeof reservation.member === 'object' ? (
                <div>
                    {makeDiv('회원명', reservation.member.name)}
                    {makeDiv('회원ID', reservation.member.userId)}
                    {makeDiv('이메일', reservation.member.userEmail)}
                </div>
            ) : (
                makeDiv('member', reservation.member)
            )}
            {/* show 정보도 마찬가지로 처리 */}
            {reservation.show && typeof reservation.show === 'object' ? (
                <div>
                    {makeDiv('공연명', reservation.show.showInfo.showName || reservation.show.name)}
                    {makeDiv('공연장소', reservation.show.showInfo.showLocation.locationName)}
                    {makeDiv('공연일시', reservation.show.showStartTime)}
                </div>
            ) : (
                makeDiv('show', reservation.show)
            )}
            {makeDiv('좌석 등급', reservation.seat.seatClass)}
            {makeDiv('좌석 번호', reservation.seat.seatNumber)}
            {makeDiv('예약 일자', reservation.reservationDate)}
            {makeDiv('예약 상태', reservation.status)}
            
            {/* 버튼 */}
            <div className="flex justify-end p-4">
                <button type="button" className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500" onClick={() => moveToList(null, "reservation")}>목록</button>
            </div>
        </div>
    );
}

const makeDiv = (title, value) => {
    // 값이 객체인 경우 JSON 문자열로 변환하거나 적절히 처리
    const displayValue = typeof value === 'object' && value !== null ? 
        JSON.stringify(value, null, 2) : value;
    
    return (
        <div className="flex justify-center">
            <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                <div className="w-1/5 p-6 text-right font-bold">{title}</div>
                <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
                    {title === 'member' || title === 'show' ? (
                        <pre className="whitespace-pre-wrap">{displayValue}</pre>
                    ) : (
                        displayValue
                    )}
                </div>
            </div>
        </div>
    );
}

export default ReadComponent