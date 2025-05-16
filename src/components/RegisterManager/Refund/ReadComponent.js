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
/*
    useEffect(() => {
        getOne(showlocation).then(data => {
            console.log(data)
            setLocation(data)
        })
    }, [showlocation])
*/
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
            {makeDiv('refundNo', refund.refundNo)}
            {makeDiv('member', refund.member)}
            {makeDiv('reservation', refund.reservation)}
            {makeDiv('seat', refund.seat)}
            {makeDiv('refundDate', refund.refundDate)}

            {/* 버튼 */}
            <div className="flex justify-end p-4">
                <button type="button" className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500" onClick={() => moveToList(null, "refund")}>목록</button>
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