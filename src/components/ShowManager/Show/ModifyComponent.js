import { useEffect, useState } from "react";
import { getOne, putOne } from "../../../api/showApi";
import useCustomMove from "../../../hooks/useCustomMove";
import ResultModal from "../../common/ResultModal";
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

const ModifyComponent = ({showNo}) => {
    const [show, setShow] = useState(initState)
    const {moveToList, moveToRead} = useCustomMove()
    const [result, setResult] = useState(null)
    const [showInfoList, setShowInfoList] = useState([])

    useEffect(() => {
      getOne(showNo).then(data => {
            console.log(data)
            setShow(data)
        })
      
      getShowInfoList({ page: 1, size: 100 }).then(data => {
            console.log("ShowInfo List:", data); // 응답을 로그로 확인  
          // 응답이 객체인 경우 locationList가 배열인지 확인
            if (data.dtoList && Array.isArray(data.dtoList)) {
            setShowInfoList(data.dtoList); // dtoList에서 실제 장소 데이터를 추출
            } else {
            console.error("Expected an array for locationList, but got", data);
            }
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
      //console.log("modify result: " + data)
      setResult('Modified')
    })
  }
  /*
  const handleClickDelete = () => { // 삭제 버튼 클릭시 
    deleteOne(showno).then( data => {
      //console.log("delete result: " + data)
      setResult('Deleted')
    })
  }*/

    //모달 창이 close될때 
  const closeModal = () => {
    if(result ==='Deleted') {
      moveToList(null, "show")
    }else {
      moveToRead(showNo, "show")
    }
  } 

  const handleChangeShow = (e) => {
        show[e.target.name] = e.target.value
        setShow({...show})
    }

  const handleShowInfoChange = (e) => {
        setShow({
            ...show,
            showInfoDTO: {
                ...show.showInfoDTO,
                showInfo: e.target.value, // 선택한 locationId로 변경
            },
        });
    };

    return (
        <div className = "border-2 border-sky-200 mt-10 m-2 p-4">
       {result ? <ResultModal title={'ADD RESULT'} content={`New ${result} Added`} callbackFn={closeModal}/>:<></>}

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">ShowNo</div>
          <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md" 
           name="ShowNo"
           type={'text'} 
           value={show.showNo}
           readOnly
           >
           </input>
        </div>
      </div>

          <div className="flex justify-center">
      <div className="relative mb-4 flex w-full flex-wrap items-stretch">
        <div className="w-1/5 p-6 text-right font-bold">Show Info</div>
        <select
          className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md"
          name="showInfo"
          value={show.showInfoDTO.showInfo}
          onChange={handleShowInfoChange}
        >
          <option value="">Select Show Info</option>
          {Array.isArray(showInfoList) &&
            showInfoList.map((info) => (
              <option key={info.showInfo} value={info.showInfo}>
                {info.showName}
              </option>
            ))}
        </select>
      </div>
    </div>


      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">showStartTime</div>
          <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md" 
           name="showStartTime"
           type={'date'} 
           value={show.showStartTime}
           onChange={handleChangeShow}
           >
           </input>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">showEndTime</div>
          <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md" 
           name="showEndTime"
           type={'date'} 
           value={show.showEndTime}
           onChange={handleChangeShow}
           >
           </input>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">seatRPrice</div>
          <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md" 
           name="seatRPrice"
           type={'text'} 
           value={show.seatRPrice}
           onChange={handleChangeShow}
           >
           </input>
        </div>  
      </div>

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">seatAPrice</div>
          <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md" 
           name="seatAPrice"
           type={'text'} 
           value={show.seatAPrice}
           onChange={handleChangeShow}
           >
           </input>
        </div>  
      </div>

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">seatSPrice</div>
          <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md" 
           name="seatSPrice"
           type={'text'} 
           value={show.seatSPrice}
           onChange={handleChangeShow}
           >
           </input>
        </div>  
      </div>

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">seatVipPrice</div>
          <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md" 
           name="seatVipPrice"
           type={'text'} 
           value={show.seatVipPrice}
           onChange={handleChangeShow}
           >
           </input>
        </div>  
      </div>

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">seatRCount</div>
          <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md" 
           name="seatRCount"
           type={'text'} 
           value={show.seatRCount}
           onChange={handleChangeShow}
           >
           </input>
        </div>  
      </div>

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">seatACount</div>
          <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md" 
           name="seatACount"
           type={'text'} 
           value={show.seatACount}
           onChange={handleChangeShow}
           >
           </input>
        </div>  
      </div>

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">seatSCount</div>
          <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md" 
           name="seatSCount"
           type={'text'} 
           value={show.seatSCount}
           onChange={handleChangeShow}
           >
           </input>
        </div>  
      </div>


      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">seatVipCount</div>
          <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md" 
           name="seatVipCount"
           type={'text'} 
           value={show.seatVipCount}
           onChange={handleChangeShow}
           >
           </input>
        </div>  
      </div>

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">showState</div>
          <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md" 
           name="showState"
           type={'text'} 
           value={show.showState}
           onChange={handleChangeShow}
           >
           </input>
        </div>  
      </div>

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