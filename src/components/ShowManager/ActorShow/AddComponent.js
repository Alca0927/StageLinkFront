import { useState, useEffect } from "react";
import { postAdd } from "../../../api/actorShowApi";
import ResultModal from "../../common/ResultModal";
import useCustomMove from "../../../hooks/useCustomMove";
import { getList as getShowInfoList } from "../../../api/showInfoApi";
import { getList as getActorList } from "../../../api/actorApi";

const initState = {
    actorDTO: {
        actorNo: 0,
    },
    showInfoDTO: {
        showInfo: 0,
    },
    roleName: "",
    showStartTime: "",
    showEndTime: ""
}

const AddComponent = () => {
    const [actorShow, setActorShow] = useState({...initState});
    const [result, setResult] = useState(null);
    const { moveToList } = useCustomMove();
    const [showInfoList, setShowInfoList] = useState([]);
    const [actorList, setActorList] = useState([]);

    // 공연 정보와 배우 목록 로드
    useEffect(() => {
        // 공연 정보 목록 로드
        getShowInfoList({ page: 1, size: 100 }).then(data => {
            console.log("ShowInfo List:", data);
            if (data.dtoList && Array.isArray(data.dtoList)) {
                setShowInfoList(data.dtoList);
            } else {
                console.error("Expected an array for showInfoList, but got", data);
            }
        });

        // 배우 목록 로드
        getActorList({ page: 1, size: 100 }).then(data => {
            console.log("Actor List:", data);
            if (data.dtoList && Array.isArray(data.dtoList)) {
                setActorList(data.dtoList);
            } else {
                console.error("Expected an array for actorList, but got", data);
            }
        });
    }, []);

    // 일반 입력값 변경 처리
    const handleChange = (e) => {
        const { name, value } = e.target;
        setActorShow(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // 배우 선택 변경 처리
    const handleActorChange = (e) => {
        const selectedActorNo = parseInt(e.target.value);
        const selectedActor = actorList.find(actor => actor.actorNo === selectedActorNo);
        
        setActorShow(prev => ({
            ...prev,
            actorDTO: selectedActor || {
                actorNo: selectedActorNo
            }
        }));
    };

    // 공연 정보 선택 변경 처리
    const handleShowInfoChange = (e) => {
        const selectedShowInfo = parseInt(e.target.value);
        const selectedShow = showInfoList.find(show => show.showInfo === selectedShowInfo);
        
        setActorShow(prev => ({
            ...prev,
            showInfoDTO: selectedShow || {
                showInfo: selectedShowInfo
            }
        }));
    };

    // 배우 출연작 추가 처리
    const handleClickAdd = () => {
        // 필수 입력값 검증
        if (!actorShow.actorDTO.actorNo || actorShow.actorDTO.actorNo === 0) {
            alert('배우를 선택해주세요.');
            return;
        }
        if (!actorShow.showInfoDTO.showInfo || actorShow.showInfoDTO.showInfo === 0) {
            alert('공연을 선택해주세요.');
            return;
        }
        if (!actorShow.roleName.trim()) {
            alert('배역명을 입력해주세요.');
            return;
        }

        console.log('추가할 배우 출연작 정보:', actorShow);
        
        postAdd(actorShow)
        .then(result => {
            console.log('추가 결과:', result);
            setResult(result.actorNo);
            setActorShow({...initState});
        })
        .catch(e => {
            console.error('배우 출연작 추가 실패:', e);
            alert('배우 출연작 추가에 실패했습니다.');
        });
    };

    // 모달 닫기
    const closeModal = () => {
        setResult(null);
        moveToList(null, "actorshow");
    };

    return (
        <div className="border-2 border-sky-200 mt-10 m-2 p-4">
            {result ? 
                <ResultModal 
                    title={'배우 출연작 추가 완료'} 
                    content={`배우 번호 ${result}번의 출연작이 추가되었습니다.`} 
                    callbackFn={closeModal}
                /> 
                : <></>
            }

            <div className="flex justify-center mb-6">
                <h2 className="text-2xl font-bold">배우 출연작 추가</h2>
            </div>

            {/* 배우 선택 */}
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">
                        배우 선택 <span className="text-red-500">*</span>
                    </div>
                    <select
                        className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md"
                        name="actorNo"
                        value={actorShow.actorDTO.actorNo}
                        onChange={handleActorChange}
                    >
                        <option value="0">배우를 선택하세요</option>
                        {Array.isArray(actorList) &&
                            actorList.map((actor) => (
                                <option key={actor.actorNo} value={actor.actorNo}>
                                    {actor.actorName}
                                </option>
                            ))}
                    </select>
                </div>
            </div>

            {/* 공연 선택 */}
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">
                        공연 선택 <span className="text-red-500">*</span>
                    </div>
                    <select
                        className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md"
                        name="showInfo"
                        value={actorShow.showInfoDTO.showInfo}
                        onChange={handleShowInfoChange}
                    >
                        <option value="0">공연을 선택하세요</option>
                        {Array.isArray(showInfoList) &&
                            showInfoList.map((info) => (
                                <option key={info.showInfo} value={info.showInfo}>
                                    {info.showName}
                                </option>
                            ))}
                    </select>
                </div>
            </div>

            {/* 배역명 */}
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
                        placeholder="배역명을 입력하세요 (예: 햄릿, 엘파바)"
                    />
                </div>
            </div>

            {/* 출연 시작일 */}
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

            {/* 출연 종료일 */}
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
            <div className="flex justify-end gap-4">
                <div className="relative mb-4 flex p-4 flex-wrap items-stretch">
                    <button 
                        type="button" 
                        className="rounded p-4 w-36 bg-gray-500 text-xl text-white hover:bg-gray-600"
                        onClick={() => setActorShow({...initState})}
                    >
                        초기화
                    </button>
                </div>
                <div className="relative mb-4 flex p-4 flex-wrap items-stretch">
                    <button 
                        type="button" 
                        className="rounded p-4 w-36 bg-blue-500 text-xl text-white hover:bg-blue-600"
                        onClick={handleClickAdd}          
                    >
                        추가
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddComponent;