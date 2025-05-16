import { useEffect, useState } from "react";
import { getOne, putOne } from "../../../api/showLocationApi";
import useCustomMove from "../../../hooks/useCustomMove";
import ResultModal from "../../common/ResultModal";

const initState = {
    showlocation: 0,
    facilityId: "",
    locationName: "",
    locationAddress: ""
}

const ModifyComponent = ({showlocation}) => {
    const [location, setLocation] = useState(initState)
    const {moveToList, moveToRead} = useCustomMove()
    const [result, setResult] = useState(null)

    useEffect(() => {
        getOne(showlocation).then(data => {
            console.log(data)
            setLocation(data)
        })
    }, [showlocation])

    const handleClickModify = () => { // 수정 버튼 클릭시 
    putOne(location).then(data => {
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
      moveToList(null, "location")
    }else {
      moveToRead(showlocation, "location")
    }
  } 

  const handleChangeShow = (e) => {
        location[e.target.name] = e.target.value
        setLocation({...location})
    }


    return (
        <div className = "border-2 border-sky-200 mt-10 m-2 p-4">
       {result ? <ResultModal title={'ADD RESULT'} content={`New ${result} Added`} callbackFn={closeModal}/>:<></>}

        <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">locationName</div>
          <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md" 
           name="showLocation"
           type={'text'} 
           value={location.showlocation}
           readOnly
           >
           </input>
        </div>  
      </div>

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">locationName</div>
          <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md" 
           name="facilityId"
           type={'text'} 
           value={location.facilityId}
           readOnly
           >
           </input>
        </div>  
      </div>

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">locationName</div>
          <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md" 
           name="locationName"
           type={'text'} 
           value={location.locationName}
           onChange={handleChangeShow}
           >
           </input>
        </div>  
      </div>

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">locationAddress</div>
          <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md" 
           name="locationAddress"
           type={'text'} 
           value={location.locationAddress}
           onChange={handleChangeShow}
           >
           </input>
        </div>  
      </div>

      <div className="flex justify-end p-4">
        <button type="button" 
          className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500"
          onClick={handleClickModify} >
          수정
        </button>  
      </div>
    </div>
    );
}

export default ModifyComponent