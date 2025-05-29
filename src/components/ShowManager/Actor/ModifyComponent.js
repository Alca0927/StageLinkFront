import { useState, useEffect } from "react";
import { putOne, getOne } from "../../../api/actorApi";
import useCustomMove from "../../../hooks/useCustomMove";
import ResultModal from "../../common/ResultModal";

const initState = {
  actorNo:0,
	actorImage:"",
	actorName:"",
	actorProfile:""
}

const ModifyComponent = ({actorNo}) => {
    const [actor, setActor] = useState(initState)
    const {moveToList, moveToRead} = useCustomMove()
    const [result, setResult] = useState(null)


    useEffect(() => {
            getOne(actorNo).then(data => {
                console.log(data)
                setActor(data)
            })
        }, [actorNo])
      
    // 수정 버튼 클릭 처리
    const handleClickModify = () => {
        // 필수 입력값 검증
        if (!actor.actorName.trim()) {
            alert('배우 이름을 입력해주세요.');
            return;
        }

        console.log("수정할 배우 정보:", actor);
        
        putOne(actor)
            .then(data => {
                console.log("수정 결과:", data);
                setResult('Modified');
            })
            .catch(error => {
                console.error("수정 실패:", error);
                alert("배우 정보 수정에 실패했습니다.");
            });
    };


    // 모달 창 닫기 처리
    const closeModal = () => {
        if (result === 'Deleted') {
            moveToList(null, "actor");
        } else {
            moveToRead(actorNo, "actor");
        }
    }; 

  // 삭제 버튼 클릭 처리 (필요시 활성화)
    /*
    const handleClickDelete = () => {
        if (window.confirm('정말로 이 배우를 삭제하시겠습니까?')) {
            deleteOne(actorNo).then(data => {
                console.log("삭제 결과:", data);
                setResult('Deleted');
            }).catch(error => {
                console.error("삭제 실패:", error);
                alert("배우 삭제에 실패했습니다.");
            });
        }
    };
  */

    // 입력값 변경 처리
    const handleChange = (e) => {
        const { name, value } = e.target;
        setActor(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className = "border-2 border-sky-200 mt-10 m-2 p-4">
       {result ? <ResultModal title={'ADD RESULT'} content={`New ${result} Added`} callbackFn={closeModal}/>:<></>}

        {/* 배우 번호 (읽기 전용) */}
        <div className="flex justify-center">
            <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                <div className="w-1/5 p-6 text-right font-bold">배우 번호</div>
                <input 
                    className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md bg-gray-100" 
                    name="actorNo"
                    type="text" 
                    value={actor.actorNo}
                    readOnly
                />
            </div>
        </div>

        {/* 배우 이미지 */}
        <div className="flex justify-center">
            <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                <div className="w-1/5 p-6 text-right font-bold">배우 이미지</div>
                <input 
                    className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md" 
                    name="actorImage"
                    type="text" 
                    value={actor.actorImage}
                    onChange={handleChange}
                    placeholder="이미지 URL을 입력하세요"
                />
            </div>
        </div>

        {/* 배우 이름 */}
        <div className="flex justify-center">
            <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                <div className="w-1/5 p-6 text-right font-bold">
                    배우 이름 <span className="text-red-500">*</span>
                </div>
                <input 
                    className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md" 
                    name="actorName"
                    type="text" 
                    value={actor.actorName}
                    onChange={handleChange}
                    placeholder="배우 이름을 입력하세요"
                    required
                />
            </div>
        </div>

        {/* 배우 프로필 */}
        <div className="flex justify-center">
            <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                <div className="w-1/5 p-6 text-right font-bold">배우 프로필</div>
                <input 
                    className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md resize-none" 
                    name="actorProfile"
                    type="text"
                    value={actor.actorProfile}
                    onChange={handleChange}
                    placeholder="배우의 프로필을 입력하세요"
                    rows="4"
                />
            </div>
        </div>

        {/* 삭제 버튼 (필요시 주석 해제)
            <button 
                type="button" 
                className="rounded p-4 w-32 text-xl text-white bg-red-500 hover:bg-red-600"
                onClick={handleClickDelete}
            >
                삭제
            </button>
        */}

        <div className="flex justify-end p-4">
            <button type="button" 
                className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500"
                onClick={handleClickModify} >
                Modify
            </button>  
        </div>
    </div>
    );
}

export default ModifyComponent