import { useEffect, useState } from "react";
import { getOne, putOne } from "../../../api/showInfoApi";
import useCustomMove from "../../../hooks/useCustomMove";
import { getList as getLocationList} from "../../../api/showLocationApi";

const initState = {
    showInfo: 0,
    showPoster: "",
    showName: "",
    showExplain: "",
    showCategory: "",
    showAge: 0,
    showDuration: "",
    showLocationDTO: {
        showlocation: "",
        locationName: "",
    },
    showStyUrl1: "",
    showStyUrl2: "",
    showStyUrl3: "",
    showStyUrl4: ""
}

const ReadComponent = ({showInfo}) => {
    const [showinfo, setShowInfo] = useState(initState)
    const {moveToList} = useCustomMove()
    const [locationList, setLocationList] = useState([]);

    useEffect(() => {
        getOne(showInfo).then(data => {
            console.log(data)
            setShowInfo(data)
        })
        .catch(error => {
            console.error("Error fetching ShowInfo :", error)
        })

        // 위치 리스트 가져오기
        getLocationList({ page: 1, size: 100 }).then(data => {
            console.log("Location List:", data);
            if (data.dtoList && Array.isArray(data.dtoList)) {
                setLocationList(data.dtoList);
            } else {
                console.error("Expected an array for locationList, but got", data);
            }
        }).catch(error => {
            console.error("Error fetching location list:", error);
        });
    }, [showInfo])

    const handleClickModify = () => { // 수정 버튼 클릭시 
        const requestData = {
            ...showinfo,
            showLocationDTO: {
                ...showinfo.showLocationDTO,
                showlocation: showinfo.showLocationDTO.showlocation,
            },
        };

        putOne(requestData).then(data => {
            alert("수정이 완료되었습니다.");
            moveToList(null, "showinfo");
        }).catch(error => {
            console.error("Update failed:", error);
            alert("수정 중 오류가 발생했습니다.");
        });
    }

    const handleChangeShowinfo = (e) => {
        setShowInfo({
            ...showinfo,
            [e.target.name]: e.target.value
        });
    }

    const handleLocationChange = (e) => {
        const selectedLocationId = e.target.value;
        const selectedLocation = locationList.find(loc => loc.showlocation == selectedLocationId);
        
        setShowInfo({
            ...showinfo,
            showLocationDTO: {
                showlocation: selectedLocationId,
                locationName: selectedLocation ? selectedLocation.locationName : "",
            },
        });
    };

    return (
        <div className="border-2 border-sky-200 mt-10 m-2 p-4">
            {makeEditableDiv('showInfo', showinfo.showInfo, true)}
            {makeEditableDiv('showPoster', showinfo.showPoster, false, handleChangeShowinfo)}
            {makeEditableDiv('showName', showinfo.showName, false, handleChangeShowinfo)}
            {makeEditableDiv('showExplain', showinfo.showExplain, false, handleChangeShowinfo)}
            {makeEditableDiv('showCategory', showinfo.showCategory, false, handleChangeShowinfo)}
            {makeEditableDiv('showAge', showinfo.showAge, false, handleChangeShowinfo)}
            {makeEditableDiv('showDuration', showinfo.showDuration, false, handleChangeShowinfo)}
            
            {makeSelectableDiv('locationName', showinfo.showLocationDTO?.showlocation, false, handleLocationChange, locationList)}
            
            {makeEditableDiv('showStyUrl1', showinfo.showStyUrl1, false, handleChangeShowinfo)}
            {makeEditableDiv('showStyUrl2', showinfo.showStyUrl2, false, handleChangeShowinfo)}
            {makeEditableDiv('showStyUrl3', showinfo.showStyUrl3, false, handleChangeShowinfo)}
            {makeEditableDiv('showStyUrl4', showinfo.showStyUrl4, false, handleChangeShowinfo)}

            {/* 버튼 */}
            <div className="flex justify-end p-4">
                <button type="button" className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500" onClick={() => moveToList(null, "showinfo")}>목록</button>
                <button type="button" className="rounded p-4 m-2 text-xl w-32 text-white bg-red-500" onClick={handleClickModify}>수정</button>
            </div>
        </div>
    );
}

const makeEditableDiv = (title, value, readOnly = false, onChange) => 
    <div className="flex items-center py-4 border-b">
        <div className="w-1/4 text-right pr-4 font-bold text-gray-700">{title}</div>
        <input
            type="text"
            name={title}
            value={value || ""}
            readOnly={readOnly}
            onChange={onChange}
            className={`w-3/4 ${readOnly ? "bg-gray-100" : "bg-white"} p-3 rounded shadow-sm text-gray-900 font-medium border border-gray-300`}
        />
    </div>

const makeSelectableDiv = (title, value, readOnly = false, onChange, locationList) => 
    <div className="flex items-center py-4 border-b">
        <div className="w-1/4 text-right pr-4 font-bold text-gray-700">{title}</div>
        <select
            className="w-3/4 p-3 rounded border border-gray-300 shadow-sm"
            name="showlocation"
            value={value || ""}
            disabled={readOnly}
            onChange={onChange}
        >
            <option value="">Select Location</option>
            {Array.isArray(locationList) && locationList.map(location => (
                <option key={location.showlocation} value={location.showlocation}>
                    {location.locationName}
                </option>
            ))}
        </select>
    </div>

export default ReadComponent