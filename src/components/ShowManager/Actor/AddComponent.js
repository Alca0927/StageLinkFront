import { useState } from "react";
import { postAdd } from "../../../api/actorApi";
import ResultModal from "../../common/ResultModal";
import useCustomMove from "../../../hooks/useCustomMove";

const initState = {
  actorNo:0,
	actorImage:"",
	actorName:"",
	actorProfile:""
}

const AddComponent = () => {
    const [actor, setActor] = useState({...initState})
    const [result, setResult] = useState(null)
    const {moveToList} = useCustomMove()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setActor(prev => ({
            ...prev,
            [name]: value
        }));
    }


    const handleClickAdd = () => {
        postAdd(actor)
        .then(result => {
            console.log(result)
            setResult(result.actorNo)
            setActor({...initState})
        }).catch(e => {
            console.error(e)
        })
    }

    const closeModal = (pageParam) => {
        setResult(null)
        moveToList(pageParam, "actor")
    }

    return (
      <div className = "border-2 border-sky-200 mt-10 m-2 p-4">
        {result !== null ? <ResultModal title={'ADD RESULT'} content={`New ${result} Added`} callbackFn={closeModal}/>:<></>}

        <div className="flex justify-center">
          <div className="relative mb-4 flex w-full flex-wrap items-stretch">
            <div className="w-1/5 p-6 text-right font-bold">배우 사진</div>
            <input
              className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md"
              name="actorImage"
              type={'text'} 
              value={actor.actorImage}
              onChange={handleChange}
              placeholder="이미지 URL을 입력하세요"
            />
          </div>
        </div>


      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">배우 이름</div>
          <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md" 
           name="actorName"
           type={'text'} 
           value={actor.actorName}
           onChange={handleChange}
           placeholder="배우 이름을 입력하세요"
           />
        </div>
      </div>

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">배우 프로필</div>
          <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md" 
           name="actorProfile"
           type={'text'} 
           value={actor.actorProfile}
           onChange={handleChange}
           placeholder="배우의 프로필을 입력하세요"
           />
        </div>
      </div>

      <div className="flex justify-end">
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