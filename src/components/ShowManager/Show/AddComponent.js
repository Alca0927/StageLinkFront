import { useState, useEffect } from "react";
import { postAdd } from "../../../api/showApi";
import ResultModal from "../../common/ResultModal";
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

const AddComponent = () => {
    const [show, setShow] = useState({...initState})
    const [result, setResult] = useState(null)
    const {moveToList} = useCustomMove()
    const [showInfoList, setShowInfoList] = useState([])

    const handleChangeShow = (e) => {
        show[e.target.name] = e.target.value
        setShow({...show})
    }

    // 추가
    useEffect(() => {
      getShowInfoList({ page: 1, size: 100 }).then(data => {
          console.log("ShowInfo List:", data); // 응답을 로그로 확인  
          // 응답이 객체인 경우 locationList가 배열인지 확인
          if (data.dtoList && Array.isArray(data.dtoList)) {
          setShowInfoList(data.dtoList); // dtoList에서 실제 장소 데이터를 추출
          } else {
          console.error("Expected an array for locationList, but got", data);
          }
      });
    }, [])

    const handleClickAdd = () => {
        //console.log(show)
        postAdd(show)
        .then(result => {
            console.log(result)
            setResult(result.showNo)
            setShow({...initState})
        }).catch(e => {
            console.error(e)
        })
    }

    const closeModal = () => {
        setResult(null)
        moveToList(null, "show")
    }

    const handleShowInfoChange = (e) => {
        setShow({
            ...show,
            showInfoDTO: {
                ...show.showInfoDTO,
                showInfo: parseInt(e.target.value), // 선택한 locationId로 변경
            },
        });
    };


    return (
        <div className = "border-2 border-sky-200 mt-10 m-2 p-4">
       {result ? <ResultModal title={'ADD RESULT'} content={`New ${result} Added`} callbackFn={closeModal}/>:<></>}

          <div className="flex justify-center">
      <div className="relative mb-4 flex w-full flex-wrap items-stretch">
        <div className="w-1/5 p-6 text-right font-bold">공연 상세 선택</div>
        <select
          className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md"
          name="showInfo"
          value={show.showInfoDTO.showInfo}
          onChange={handleShowInfoChange}
        >
          <option value="">공연을 선택하세요</option>
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
          <div className="w-1/5 p-6 text-right font-bold">공연 시작 시간</div>
          <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md" 
           name="showStartTime"
           type={'datetime-local'} 
           value={show.showStartTime}
           onChange={handleChangeShow}
           >
           </input>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">공연 종료 시간</div>
          <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md" 
           name="showEndTime"
           type={'datetime-local'} 
           value={show.showEndTime}
           onChange={handleChangeShow}
           >
           </input>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">R석 가격</div>
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
          <div className="w-1/5 p-6 text-right font-bold">A석 가격</div>
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
          <div className="w-1/5 p-6 text-right font-bold">S석 가격</div>
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
          <div className="w-1/5 p-6 text-right font-bold">Vip석 가격</div>
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
          <div className="w-1/5 p-6 text-right font-bold">R석 갯수</div>
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
          <div className="w-1/5 p-6 text-right font-bold">A석 갯수</div>
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
          <div className="w-1/5 p-6 text-right font-bold">S석 갯수</div>
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
          <div className="w-1/5 p-6 text-right font-bold">VIP석 갯수</div>
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
          <div className="w-1/5 p-6 text-right font-bold">공연 상태</div>
          <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md" 
           name="showState"
           type={'text'} 
           value={show.showState}
           onChange={handleChangeShow}
           >
           </input>
        </div>  
      </div>

      <div className="flex justify-end">
        <div className="relative mb-4 flex p-4 flex-wrap items-stretch">
          <button type="button" 
          className="rounded p-4 w-36 bg-blue-500 text-xl  text-white "
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