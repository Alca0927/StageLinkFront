import { useEffect, useState } from "react";
import { getOne } from "../../../api/showInfoApi";
import useCustomMove from "../../../hooks/useCustomMove";

const initState = {
    showInfo: 0,
    showPoster: "",
    showName: "",
    showExplain: "",
    showCategory: "",
    showAge: 0,
    showDuration: "",
    showLocationDTO: {
      locationName: "",
    },
    showStyUrl1: "",
    showStyUrl2: "",
    showStyUrl3: "",
    showStyUrl4: ""
}

const ReadComponent = ({showInfo}) => {
    const [showinfo, setShowInfo] = useState(initState)
    const {moveToList, moveToModify} = useCustomMove()

    useEffect(() => {
        getOne(showInfo).then(data => {
            console.log(data)
            setShowInfo(data)
        })
    }, [showInfo])

    return (
        <div className="border-2 border-sky-200 mt-10 m-2 p-4">
            {makeDiv('showInfo', showinfo.showInfo)}
            {makeDiv('showPoster', showinfo.showPoster)}
            {makeDiv('showName', showinfo.showName)}
            {makeDiv('showExplain', showinfo.showExplain)}
            {makeDiv('showCategory', showinfo.showCategory)}
            {makeDiv('showAge', showinfo.showAge)}
            {makeDiv('showDuration', showinfo.showDuration)}
            
            {makeDiv('locationName', showinfo.showLocationDTO?.locationName)}
            
            {makeDiv('showStyUrl1', showinfo.showStyUrl1)}
            {makeDiv('showStyUrl2', showinfo.showStyUrl2)}
            {makeDiv('showStyUrl3', showinfo.showStyUrl3)}
            {makeDiv('showStyUrl4', showinfo.showStyUrl4)}

            {/* 버튼 */}
            <div className="flex justify-end p-4">
                <button type="button" className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500" onClick={() => moveToList(null, "showinfo")}>목록</button>
                <button type="button" className="rounded p-4 m-2 text-xl w-32 text-white bg-red-500" onClick={() => moveToModify(showInfo, "showinfo")}>수정</button>
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