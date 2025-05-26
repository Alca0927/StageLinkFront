import { useEffect, useState } from "react";
import { getOne } from "../../../api/actorApi";
import useCustomMove from "../../../hooks/useCustomMove";

const initState = {
    actorNo:0,
	actorImage:"",
	actorName:"",
	actorProfile:""
}

const ReadComponent = ({actorNo}) => {
    const [actor, setActor] = useState(initState)
    const {moveToList, moveToModify} = useCustomMove()

    useEffect(() => {
        getOne(actorNo).then(data => {
            console.log(data)
            setActor(data)
        })
    }, [actorNo])

    return (
        <div className="border-2 border-sky-200 mt-10 m-2 p-4">
            {makeDiv('actorNo', actor.actorNo)}
            {makeDiv('actorImage', actor.actorImage)}
            {makeDiv('actorName', actor.actorName)}
            {makeDiv('actorProfile', actor.actorProfile)}
            
            {/* 버튼 */}
            <div className="flex justify-end p-4">
                <button type="button" className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500" onClick={() => moveToList(null, "actor")}>목록</button>
                <button type="button" className="rounded p-4 m-2 text-xl w-32 text-white bg-red-500" onClick={() => moveToModify(actor.actorNo, "actor")}>수정</button>
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