import { useEffect, useState } from "react";
import { getOne, putOne } from "../../../api/actorShowApi";
import useCustomMove from "../../../hooks/useCustomMove";
import ResultModal from "../../common/ResultModal";

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
        showCategory: ""
    },
    roleName: "",
    showStartTime: "",
    showEndTime: ""
}

const ModifyComponent = ({ actorNo, showInfoId }) => {
    const [actorShow, setActorShow] = useState(initState);
    const { moveToList, moveToRead } = useCustomMove();
    const [result, setResult] = useState(null);

    // 컴포넌트 마운트 시 배우 출연작 정보 로드
    useEffect(() => {
        if (actorNo && showInfoId) {
            getOne(actorNo, showInfoId)
                .then(data => {
                    console.log("배우 출연작 정보 로드:", data);
                    setActorShow(data);
                })
                .catch(error => {
                    console.error("배우 출연작 정보 로드 실패:", error);
                    alert("배우 출연작 정보를 불러오는데 실패했습니다.");
                });
        }
    }, [actorNo, showInfoId]);

    // 수정 버튼 클릭 처리
    const handleClickModify = () => {
        // 필수 입력값 검증
        if (!actorShow.roleName.trim()) {
            alert('배역명을 입력해주세요.');
            return;
        }

        console.log("수정할 배우 출연작 정보:", actorShow);
        
        putOne(actorShow)
            .then(data => {
                console.log("수정 결과:", data);
                setResult('Modified');
            })
            .catch(error => {
                console.error("수정 실패:", error);
                alert("배우 출연작 정보 수정에 실패했습니다.");
            });
    };

    // 모달 창 닫기 처리
    const closeModal = () => {
        if (result === 'Deleted') {
            moveToList(null, "actorshow");
        } else {
            moveToRead(`${actorNo}/${showInfoId}`, "actorshow");
        }
    };

    // 입력값 변경 처리 (복합키 제외)
    const handleChange = (e) => {
        const { name, value } = e.target;
        setActorShow(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="border-2 border-sky-200 mt-10 m-2 p-4">
            {result ? 
                <ResultModal 
                    title={result === 'Modified' ? '수정 완료' : '삭제 완료'} 
                    content={result === 'Modified' ? `배우 출연작 정보가 수정되었습니다.` : `배우 출연작이 삭제되었습니다.`} 
                    callbackFn={closeModal}
                /> 
                : <></>
            }

            <div className="flex justify-center mb-6">
                <h2 className="text-2xl font-bold">배우 출연작 수정</h2>
            </div>

            {/* 배우 정보 (읽기 전용) */}
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">배우 번호</div>
                    <input 
                        className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md bg-gray-100" 
                        name="actorNo"
                        type="text" 
                        value={actorShow.actorDTO.actorNo}
                        readOnly
                    />
                </div>
            </div>

            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">배우명</div>
                    <input 
                        className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md bg-gray-100" 
                        name="actorName"
                        type="text" 
                        value={actorShow.actorDTO.actorName}
                        readOnly
                    />
                </div>
            </div>

            {/* 공연 정보 (읽기 전용) */}
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">공연 번호</div>
                    <input 
                        className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md bg-gray-100" 
                        name="showInfo"
                        type="text" 
                        value={actorShow.showInfoDTO.showInfo}
                        readOnly
                    />
                </div>
            </div>

            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">공연명</div>
                    <input 
                        className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md bg-gray-100" 
                        name="showName"
                        type="text" 
                        value={actorShow.showInfoDTO.showName}
                        readOnly
                    />
                </div>
            </div>

            {/* 배역명 (수정 가능) */}
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">
                        배역명 <span className="text-red-500">*</span>
                    </div>
                    <input 
                        className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md" 
                        name="roleName"
                        type="text" 
                        value={actorShow.roleName}
                        onChange={handleChange}
                        placeholder="배역명을 입력하세요"
                    />
                </div>
            </div>

            {/* 출연 시작일 (수정 가능) */}
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">출연 시작일</div>
                    <input 
                        className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md" 
                        name="showStartTime"
                        type="date" 
                        value={actorShow.showStartTime}
                        onChange={handleChange}
                    />
                </div>
            </div>

            {/* 출연 종료일 (수정 가능) */}
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">출연 종료일</div>
                    <input 
                        className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md" 
                        name="showEndTime"
                        type="date" 
                        value={actorShow.showEndTime}
                        onChange={handleChange}
                    />
                </div>
            </div>

            {/* 버튼 영역 */}
            <div className="flex justify-end gap-4 p-4">
                <button 
                    type="button" 
                    className="rounded p-4 w-32 text-xl text-white bg-gray-500 hover:bg-gray-600"
                    onClick={() => moveToRead(`${actorNo}/${showInfoId}`, "actorshow")}
                >
                    취소
                </button>
                
                <button 
                    type="button" 
                    className="rounded p-4 w-32 text-xl text-white bg-blue-500 hover:bg-blue-600"
                    onClick={handleClickModify}
                >
                    수정
                </button>
            </div>
        </div>
    );
}

export default ModifyComponent;