import { useEffect, useState } from "react";
import { getOne, putOne } from "../../../api/showInfoApi";
import useCustomMove from "../../../hooks/useCustomMove";
import ResultModal from "../../common/ResultModal";
import { getList as getLocationList} from "../../../api/showLocationApi";

const initState = {
    showInfo: 0,
    showPoster: "",
    showName: "",
    showExplain: "",
    showCategory: "",
    showAge: 0,
    showDuration: "",
    showLocationDTO: {
      showlocation: 0,
      locationName: "",
    },
    showStyUrl1: "",
    showStyUrl2: "",
    showStyUrl3: "",
    showStyUrl4: ""
}

const ModifyComponent = ({showInfo}) => {
    const [showinfo, setShowInfo] = useState(initState)
    const {moveToList, moveToRead} = useCustomMove()
    const [result, setResult] = useState(null)
    const [locationList, setLocationList] = useState([]);

    useEffect(() => {
        getOne(showInfo).then(data => {
            console.log(data)
            setShowInfo(data)
        });

        getLocationList({ page: 1, size: 100 }).then(data => {
            console.log("Location List:", data); // 응답을 로그로 확인  
          // 응답이 객체인 경우 locationList가 배열인지 확인
            if (data.dtoList && Array.isArray(data.dtoList)) {
            setLocationList(data.dtoList); // dtoList에서 실제 장소 데이터를 추출
            } else {
            console.error("Expected an array for locationList, but got", data);
            }
        });
    }, [showInfo])

    const handleClickModify = () => { // 수정 버튼 클릭시 
    const requestData = {
       ...showinfo,
            showLocationDTO: {
                ...showinfo.showLocationDTO,
                showlocation: showinfo.showLocationDTO.showlocation, // 선택된 locationId 사용
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
      moveToList(null, "showinfo")
    }else {
      moveToRead(showInfo, "showinfo")
    }
  } 

  const handleChangeShowinfo = (e) => {
        showinfo[e.target.name] = e.target.value
        setShowInfo({...showinfo})
    }

    const handleLocationChange = (e) => {
        setShowInfo({
            ...showinfo,
            showLocationDTO: {
                ...showinfo.showLocationDTO,
                showlocation: e.target.value, // 선택한 locationId로 변경
            },
        });
    };

    return (
        <div className = "border-2 border-sky-200 mt-10 m-2 p-4">
       {result ? <ResultModal title={'ADD RESULT'} content={`New ${result} Added`} callbackFn={closeModal}/>:<></>}

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">showInfo</div>
          <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md" 
           name="showInfo"
           type={'text'} 
           value={showinfo.showInfo}
           readOnly
           >
           </input>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">showPoster</div>
          <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md" 
           name="showPoster"
           type={'text'} 
           value={showinfo.showPoster}
           onChange={handleChangeShowinfo}
           >
           </input>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">showName</div>
          <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md" 
           name="showName"
           type={'text'} 
           value={showinfo.showName}
           onChange={handleChangeShowinfo}
           >
           </input>
        </div>  
      </div>

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">showExplain</div>
          <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md" 
           name="showExplain"
           type={'text'} 
           value={showinfo.showExplain}
           onChange={handleChangeShowinfo}
           >
           </input>
        </div>  
      </div>

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">showCategory</div>
          <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md" 
           name="showCategory"
           type={'text'} 
           value={showinfo.showCategory}
           onChange={handleChangeShowinfo}
           >
           </input>
        </div>  
      </div>


      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">showAge</div>
          <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md" 
           name="showAge"
           type={'text'} 
           value={showinfo.showAge}
           onChange={handleChangeShowinfo}
           >
           </input>
        </div>  
      </div>

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">showDuration</div>
          <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md" 
           name="showDuration"
           type={'text'} 
           value={showinfo.showDuration}
           onChange={handleChangeShowinfo}
           >
           </input>
        </div>  
      </div>

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">Location</div>
            <select
              className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md"
              name="showlocation"
              value={showinfo.showLocationDTO.showlocation}
              onChange={handleLocationChange}
            >
            <option value="">Select Location</option>
              {Array.isArray(locationList) && locationList.map(location => (
              <option key={location.showlocation} value={location.showlocation}>
              {location.locationName}
            </option>
            ))}
            </select>
          </div>
      </div>

{/*
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">locationAddress</div>
          <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md" 
           name="locationAddress"
           type={'text'} 
           value={showinfo.locationAddress}
           onChange={handleChangeShowinfo}
           >
           </input>
        </div>  
      </div>
*/}
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">showStyUrl1</div>
          <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md" 
           name="showStyUrl1"
           type={'text'} 
           value={showinfo.showStyUrl1}
           onChange={handleChangeShowinfo}
           >
           </input>
        </div>  
      </div>

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">showStyUrl2</div>
          <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md" 
           name="showStyUrl2"
           type={'text'} 
           value={showinfo.showStyUrl2}
           onChange={handleChangeShowinfo}
           >
           </input>
        </div>  
      </div>

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">showStyUrl3</div>
          <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md" 
           name="showStyUrl3"
           type={'text'} 
           value={showinfo.showStyUrl3}
           onChange={handleChangeShowinfo}
           >
           </input>
        </div>  
      </div>

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">showStyUrl4</div>
          <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md" 
           name="showStyUrl4"
           type={'text'} 
           value={showinfo.showStyUrl4}
           onChange={handleChangeShowinfo}
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