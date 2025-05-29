import { useEffect, useState } from "react";
import { getOne } from "../../../api/actorShowApi";
import useCustomMove from "../../../hooks/useCustomMove";

const initState = {
    actorDTO: {
        actorNo: 0,
        actorName: "",
        actorImage: "",
        actorProfile: ""
    },
    showInfoDTO: {
        showInfo: 0,
        showName: "",
        showCategory: "",
        showExplain: ""
    },
    roleName: "",
    showStartTime: "",
    showEndTime: ""
}

const ReadComponent = ({ actorNo, showInfoId }) => {
    const [actorShow, setActorShow] = useState(initState);
    const { moveToList, moveToModify } = useCustomMove();
    console.log("actorNo: ", actorNo, "showInfoId: ", showInfoId)
    useEffect(() => {
        if (actorNo !== undefined && showInfoId !== undefined) {
            getOne(actorNo, showInfoId)
                .then(data => {
                    console.log("배우 출연작 상세 정보:", data);
                    setActorShow(data);
                })
                .catch(error => {
                    console.error("배우 출연작 정보 로드 실패:", error);
                    alert("배우 출연작 정보를 불러오는데 실패했습니다.");
                });
        }
    }, [actorNo, showInfoId]);

    return (
        <div className="border-2 border-sky-200 mt-10 m-2 p-4">
            
            <div className="flex justify-center mb-6">
                <h2 className="text-2xl font-bold">배우 출연작 상세정보</h2>
            </div>

            {/* 배우 정보 섹션 */}
            <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4 text-blue-600 border-b pb-2">배우 정보</h3>
                {makeDiv('배우 번호', actorShow.actorDTO.actorNo)}
                {makeDiv('배우명', actorShow.actorDTO.actorName)}
                {makeDiv('배우 프로필', actorShow.actorDTO.actorProfile)}
            </div>

            {/* 공연 정보 섹션 */}
            <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4 text-green-600 border-b pb-2">공연 정보</h3>
                {makeDiv('공연 번호', actorShow.showInfoDTO.showInfo)}
                {makeDiv('공연명', actorShow.showInfoDTO.showName)}
                {makeDiv('공연 카테고리', actorShow.showInfoDTO.showCategory)}
                {makeDiv('공연 설명', actorShow.showInfoDTO.showExplain)}
            </div>

            {/* 출연 정보 섹션 */}
            <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4 text-purple-600 border-b pb-2">출연 정보</h3>
                {makeDiv('배역명', actorShow.roleName)}
                {makeDiv('출연 시작일', actorShow.showStartTime)}
                {makeDiv('출연 종료일', actorShow.showEndTime)}
                
                {/* 출연 기간 계산 */}
                {actorShow.showStartTime && actorShow.showEndTime && (
                    makeDiv('출연 기간', `${actorShow.showStartTime} ~ ${actorShow.showEndTime}`)
                )}
            </div>

            {/* 버튼 영역 */}
            <div className="flex justify-end gap-4 p-4">
                <button 
                    type="button" 
                    className="rounded p-4 w-32 text-xl text-white bg-gray-500 hover:bg-gray-600" 
                    onClick={() => moveToList(null, "actorshow")}
                >
                    목록
                </button>
                <button 
                    type="button" 
                    className="rounded p-4 w-32 text-xl text-white bg-blue-500 hover:bg-blue-600" 
                    onClick={() => moveToModify(`${actorShow.actorDTO.actorNo}/${actorShow.showInfoDTO.showInfo}`, "actorshow")}
                >
                    수정
                </button>
            </div>
        </div>
    );
}

// 공통 div 생성 함수
const makeDiv = (title, value) => 
    <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
            <div className="w-1/5 p-6 text-right font-bold">{title}</div>
            <div className="w-4/5 p-6 rounded-r border border-solid shadow-md bg-gray-50">
                {value || '정보 없음'}
            </div>
        </div>
    </div>

export default ReadComponent;