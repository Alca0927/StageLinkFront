import { useEffect, useState } from "react";
import { getOne, putOne } from "../../../api/showApi";
import useCustomMove from "../../../hooks/useCustomMove";
import { getList as getShowInfoList} from "../../../api/showInfoApi";

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
    const [originalShow, setOriginalShow] = useState(initState);
    const {moveToList} = useCustomMove()
    const [showInfoList, setShowInfoList] = useState([])

    useEffect(() => {
        getOne(showNo).then(data => {
            console.log(data)
            setShow(data)
            setOriginalShow(data);
        })
        .catch(error => {
            console.error("Error fetching Show :", error)
        })

        // ShowInfo 리스트 가져오기
        getShowInfoList({ page: 1, size: 100 }).then(data => {
            console.log("ShowInfo List:", data);
            if (data.dtoList && Array.isArray(data.dtoList)) {
                setShowInfoList(data.dtoList);
            } else {
                console.error("Expected an array for showInfoList, but got", data);
            }
        }).catch(error => {
            console.error("Error fetching showInfo list:", error);
        });
    }, [showNo])

    const handleClickModify = () => { // 수정 버튼 클릭시 
        const requestData = {
            ...show,
            showInfoDTO:{
                ...show.showInfoDTO,
                showInfo: show.showInfoDTO.showInfo,
            },
        };

        putOne(requestData).then(data => {
            alert("수정이 완료되었습니다.");
            moveToList(null, "show");
        }).catch(error => {
            console.error("Update failed:", error);
            alert("수정 중 오류가 발생했습니다.");
        });
    }

    const handleChangeShow = (e) => {
        setShow({
            ...show,
            [e.target.name]: e.target.value
        });
    }

    const handleShowInfoChange = (e) => {
        const selectedShowInfoId = e.target.value;
        const selectedShowInfo = showInfoList.find(info => info.showInfo == selectedShowInfoId);
        
        setShow({
            ...show,
            showInfoDTO: {
                showInfo: selectedShowInfoId,
                showName: selectedShowInfo ? selectedShowInfo.showName : "",
            },
        });
    };

    return (
        <div className="border-2 border-sky-200 mt-10 m-2 p-4">
            {makeEditableDiv('공연 번호', show.showNo, true)}
            {makeSelectableDiv('공연 정보', show.showInfoDTO?.showInfo, false, handleShowInfoChange, showInfoList)}
            {makeDateEditableDiv('공연 시작 시간', show.showStartTime, originalShow.showStartTime, false, handleChangeShow, 'showStartTime')}
            {makeDateEditableDiv('공연 종료 시간', show.showEndTime, originalShow.showEndTime, false, handleChangeShow, 'showEndTime')}
            {makeEditableDiv('R석 가격', show.seatRPrice, false, handleChangeShow, 'seatRPrice')}
            {makeEditableDiv('A석 가격', show.seatAPrice, false, handleChangeShow, 'seatAPrice')}
            {makeEditableDiv('S석 가격', show.seatSPrice, false, handleChangeShow, 'seatSPrice')}
            {makeEditableDiv('Vip석 가격', show.seatVipPrice, false, handleChangeShow, 'seatVipPrice')}
            {makeEditableDiv('R석 갯수', show.seatRCount, false, handleChangeShow, 'seatRCount')}
            {makeEditableDiv('A석 갯수', show.seatACount, false, handleChangeShow, 'seatACount')}
            {makeEditableDiv('S석 갯수', show.seatSCount, false, handleChangeShow, 'seatSCount')}
            {makeEditableDiv('Vip석 갯수', show.seatVipCount, false, handleChangeShow, 'seatVipCount')}
            {makeEditableDiv('공연 상태', show.showState, false, handleChangeShow, 'showState')}

            {/* 버튼 */}
            <div className="flex justify-end p-4">
                <button type="button" className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500" onClick={() => moveToList(null, "show")}>목록</button>
                <button type="button" className="rounded p-4 m-2 text-xl w-32 text-white bg-red-500" onClick={handleClickModify}>수정</button>
            </div>
        </div>
    );
}

const makeEditableDiv = (title, value, readOnly = false, onChange, name, type = 'text') => 
    <div className="flex items-center py-4 border-b">
        <div className="w-1/4 text-right pr-4 font-bold text-gray-700">{title}</div>
        <input 
            className={`w-3/4 ${readOnly ? "bg-gray-100" : "bg-white"} p-3 rounded shadow-sm text-gray-900 font-medium border border-gray-300`}
            name={name || title}
            type={type}
            value={value || ""}
            readOnly={readOnly}
            onChange={onChange}
        />
    </div>


const makeSelectableDiv = (title, value, readOnly = false, onChange, showInfoList) => 
    <div className="flex items-center py-4 border-b">
        <div className="w-1/4 text-right pr-4 font-bold text-gray-700">{title}</div>
        <select
            className="w-3/4 p-3 rounded border border-gray-300 shadow-sm"
            name="showInfo"
            value={value || ""}
            disabled={readOnly}
            onChange={onChange}
        >
            <option value="">Select Show Info</option>
            {Array.isArray(showInfoList) && showInfoList.map(info => (
                <option key={info.showInfo} value={info.showInfo}>
                    {info.showName}
                </option>
            ))}
        </select>
    </div>

const makeDateEditableDiv = (title, value, originalValue, readOnly = false, onChange, name) => 
    <div className="flex items-center py-4 border-b">
        <div className="w-1/4 text-right pr-4 font-bold text-gray-700">{title}</div>
        <div className="w-1/4 text-gray-500 text-sm">{originalValue}</div> {/* 원본 값 출력 */}
        <input 
            className={`w-2/4 ${readOnly ? "bg-gray-100" : "bg-white"} p-3 rounded shadow-sm text-gray-900 font-medium border border-gray-300`}
            name={name || title}
            type={'datetime-local'}
            value={value || ""}
            readOnly={readOnly}
            onChange={onChange}
        />
    </div>

export default ReadComponent