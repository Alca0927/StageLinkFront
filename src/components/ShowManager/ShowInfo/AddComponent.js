import { useState } from "react";
import { postAdd } from "../../../api/showInfoApi";
import ResultModal from "../../common/ResultModal";
import useCustomMove from "../../../hooks/useCustomMove";

const initState = {
    showInfo: {
    showInfo: 0,
    showPoster: "",
    showName: "",
    showExplain: "",
    showCategory: "",
    showAge: 0,
    showDuration: "",
    showLocation: {
      showLocation: 0,
      facilityId: "",
      locationName: "",
      locationAddress: ""
    },
    showStyUrl1: "",
    showStyUrl2: "",
    showStyUrl3: "",
    showStyUrl4: ""
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

    const handleChangeShow = (e) => {
        show[e.target.name] = e.target.value
        setShow({...show})
    }

    const handleClickAdd = () => {
        //console.log(show)
        postAdd(show)
        .then(result => {
            console.log(result)
            setResult(result.SHOWNO)
            setShow({...initState})
        }).catch(e => {
            console.error(e)
        })
    }

    const closeModal = () => {
        setResult(null)
        moveToList(null, "showinfo")
    }

    return (
        <div className = "border-2 border-sky-200 mt-10 m-2 p-4">
       {result ? <ResultModal title={'ADD RESULT'} content={`New ${result} Added`} callbackFn={closeModal}/>:<></>}

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">TITLE</div>
          <div className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md" 
           name="showPoster"
           type={'text'} 
           value={show.showPoster}
           onChange={handleChangeShow}
           >
           </div>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">WRITER</div>
          <div className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md" 
           name="showName"
           type={'text'} 
           value={show.showName}
           onChange={handleChangeShow}
           >
           </div>
        </div>  
      </div>

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">WRITER</div>
          <div className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md" 
           name="showExplain"
           type={'text'} 
           value={show.showExplain}
           onChange={handleChangeShow}
           >
           </div>
        </div>  
      </div>

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">WRITER</div>
          <div className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md" 
           name="showCategory"
           type={'text'} 
           value={show.showCategory}
           onChange={handleChangeShow}
           >
           </div>
        </div>  
      </div>


      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">WRITER</div>
          <div className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md" 
           name="showAge"
           type={'text'} 
           value={show.showAge}
           onChange={handleChangeShow}
           >
           </div>
        </div>  
      </div>

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">WRITER</div>
          <div className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md" 
           name="showDuration"
           type={'text'} 
           value={show.showDuration}
           onChange={handleChangeShow}
           >
           </div>
        </div>  
      </div>

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">WRITER</div>
          <div className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md" 
           name="locationName"
           type={'text'} 
           value={show.locationName}
           onChange={handleChangeShow}
           >
           </div>
        </div>  
      </div>

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">WRITER</div>
          <div className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md" 
           name="locationAddress"
           type={'text'} 
           value={show.locationAddress}
           onChange={handleChangeShow}
           >
           </div>
        </div>  
      </div>

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">WRITER</div>
          <div className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md" 
           name="showStyUrl1"
           type={'text'} 
           value={show.showStyUrl1}
           onChange={handleChangeShow}
           >
           </div>
        </div>  
      </div>

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">WRITER</div>
          <div className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md" 
           name="showStyUrl2"
           type={'text'} 
           value={show.showStyUrl2}
           onChange={handleChangeShow}
           >
           </div>
        </div>  
      </div>

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">WRITER</div>
          <div className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md" 
           name="showStyUrl3"
           type={'text'} 
           value={show.showStyUrl3}
           onChange={handleChangeShow}
           >
           </div>
        </div>  
      </div>

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">WRITER</div>
          <div className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md" 
           name="showStyUrl4"
           type={'text'} 
           value={show.showStyUrl4}
           onChange={handleChangeShow}
           >
           </div>
        </div>  
      </div>


      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">DUEDATE</div>
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
          <div className="w-1/5 p-6 text-right font-bold">DUEDATE</div>
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
          <div className="w-1/5 p-6 text-right font-bold">WRITER</div>
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
          <div className="w-1/5 p-6 text-right font-bold">WRITER</div>
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
          <div className="w-1/5 p-6 text-right font-bold">WRITER</div>
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
          <div className="w-1/5 p-6 text-right font-bold">WRITER</div>
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
          <div className="w-1/5 p-6 text-right font-bold">WRITER</div>
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
          <div className="w-1/5 p-6 text-right font-bold">WRITER</div>
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
          <div className="w-1/5 p-6 text-right font-bold">WRITER</div>
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
          <div className="w-1/5 p-6 text-right font-bold">WRITER</div>
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
          <div className="w-1/5 p-6 text-right font-bold">WRITER</div>
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
          ADD
          </button>
        </div>
      </div>
    </div>
    );
}

export default AddComponent;