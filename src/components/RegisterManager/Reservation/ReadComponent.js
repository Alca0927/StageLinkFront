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
/*
    useEffect(() => {
        getOne(showlocation).then(data => {
            console.log(data)
            setLocation(data)
        })
    }, [showlocation])
*/
    useEffect(() => {
  console.log("Received reservationNo:", reservationNo);
  if (reservationNo) {
    getOne(reservationNo).then(data => {
      console.log(data);
      setReservation(data);
    }).catch(error => {
      console.error("Error fetching location:", error);
    });
  } else {
    console.error("showlocation is invalid:", reservationNo);
  }
}, [reservationNo]);

    return (
        <div className="border-2 border-sky-200 mt-10 m-2 p-4">
            {makeDiv('reservationNo', reservation.reservationNo)}
            {makeDiv('member', reservation.member)}
            {makeDiv('show', reservation.show)}
            {makeDiv('seat', reservation.seat)}
            {makeDiv('reservationDate', reservation.reservationDate)}
            {makeDiv('status', reservation.status)}
            
            {/* 버튼 */}
            <div className="flex justify-end p-4">
                <button type="button" className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500" onClick={() => moveToList(null, "reservation")}>목록</button>
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