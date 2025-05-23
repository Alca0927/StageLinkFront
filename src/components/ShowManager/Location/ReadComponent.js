import { useEffect, useState } from "react";
import { getOne } from "../../../api/showLocationApi";
import useCustomMove from "../../../hooks/useCustomMove";

const initState = {
    showlocation: 0,
    facilityId: "",
    locationName: "",
    locationAddress: ""
}

const ReadComponent = ({showlocation}) => {
    const [location, setLocation] = useState(initState)
    const {moveToList, moveToModify} = useCustomMove()
/*
    useEffect(() => {
        getOne(showlocation).then(data => {
            console.log(data)
            setLocation(data)
        })
    }, [showlocation])
*/
    useEffect(() => {
  console.log("Received showlocation:", showlocation);
  if (showlocation) {
    getOne(showlocation).then(data => {
      console.log(data);
      setLocation(data);
    }).catch(error => {
      console.error("Error fetching location:", error);
    });
  } else {
    console.error("showlocation is invalid:", showlocation);
  }
}, [showlocation]);

    return (
        <div className="border-2 border-sky-200 mt-10 m-2 p-4">
            {makeDiv('showLocation', location.showlocation)}
            {makeDiv('facilityId', location.facilityId)}
            {makeDiv('locationName', location.locationName)}
            {makeDiv('locationAddress', location.locationAddress)}

            {/* 버튼 */}
            <div className="flex justify-end p-4">
                <button type="button" className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500" onClick={() => moveToList(null, "location")}>목록</button>
                <button type="button" className="rounded p-4 m-2 text-xl w-32 text-white bg-red-500" onClick={() => moveToModify(showlocation, "location")}>수정</button>
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