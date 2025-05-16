import { useState } from "react";
import { postAdd } from "../../../api/showLocationApi";
import ResultModal from "../../common/ResultModal";
import useCustomMove from "../../../hooks/useCustomMove";

const initState = {
  showlocation: 0,
  facilityId: "",
  locationName: "",
  locationAddress: ""
}

const AddComponent = () => {
    const [location, setLocation] = useState({...initState})
    const [result, setResult] = useState(null)
    const {moveToList} = useCustomMove()

    const handleChangeShow = (e) => {
        location[e.target.name] = e.target.value
        setLocation({...location})
    }

    const handleClickAdd = () => {
        //console.log(show)
        postAdd(location)
        .then(result => {
            console.log(result)
            setResult(result.SHOWNO)
            setLocation({...initState})
        }).catch(e => {
            console.error(e)
        })
    }

    const closeModal = () => {
        setResult(null)
        moveToList(null, "location")
    }

    return (
      <div className = "border-2 border-sky-200 mt-10 m-2 p-4">
       {result ? <ResultModal title={'ADD RESULT'} content={`New ${result} Added`} callbackFn={closeModal}/>:<></>}

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