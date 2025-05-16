import { useEffect, useState } from "react";
import { getOne } from "../../../api/showApi";
import useCustomMove from "../../../hooks/useCustomMove";

const initState = {
    showNo:0,
    showInfoDTO: {
    showInfo: 0,
    showName: "",
    },
    showStartTime: "",
    showEndTime: "",
    seatRPrice:0,
    seatAPrice:0,
    seatSPrice:0,
    seatVipPrice:0,
    seatRCount:0,
    seatACount:0,
    seatSCount:0,
    seatVipCount:0,
    showState:0
}

const ReadComponent = ({showNo}) => {
    const [show, setShow] = useState(initState)
    const {moveToList, moveToModify} = useCustomMove()

    useEffect(() => {
        getOne(showNo).then(data => {
            console.log(data)
            setShow(data)
        })
    }, [showNo])

    return (
        <div className="border-2 border-sky-200 mt-10 m-2 p-4">
            {makeDiv('showno', show.showNo)}
            {makeDiv('showName', show.showInfoDTO.showName)}
            {makeDiv('showStartTime', show.showStartTime)}
            {makeDiv('showEndTime', show.showEndTime)}
            {makeDiv('seatRPrice', show.seatRPrice)}
            {makeDiv('seatAPrice', show.seatAPrice)}
            {makeDiv('seatSPrice', show.seatSPrice)}
            {makeDiv('seatVipPrice', show.seatVipPrice)}
            {makeDiv('seatRCount', show.seatRCount)}
            {makeDiv('seatACount', show.seatACount)}
            {makeDiv('seatSCount', show.seatSCount)}
            {makeDiv('seatVipCount', show.seatVipCount)}
            {makeDiv('showState', show.showState)}

            {/* 버튼 */}
            <div className="flex justify-end p-4">
                <button type="button" className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500" onClick={() => moveToList(null, "show")}>목록</button>
                <button type="button" className="rounded p-4 m-2 text-xl w-32 text-white bg-red-500" onClick={() => moveToModify(show.showNo, "show")}>수정</button>
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