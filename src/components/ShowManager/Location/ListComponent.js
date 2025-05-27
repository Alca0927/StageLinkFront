import { useEffect, useState } from "react";
import { getList } from "../../../api/showLocationApi";
import useCustomMove from "../../../hooks/useCustomMove";
import PageComponent from "../../common/PageComponent";


const initState = {
  dtoList: [],
  pageNumList: [],
  pageRequestDTO: null,
  prev: false,
  next: false,
  totoalCount: 0,
  prevPage: 0,
  nextPage: 0,
  totalPage: 0,
  current: 0
}

const ListComponent = () => {
    const {page,size, refresh,moveToList, moveToRead} = useCustomMove()

    const [serverData, setServerData] = useState(initState)

    useEffect(() => {
      getList({page,size}).then(data => {
        console.log(data)
        setServerData(data)
      })
    }, [page,size,refresh])

    
    return (
      <div className="border-2 border-blue-100 mt-10 mr-2 ml-2">
  
      <div className="flex flex-wrap mx-auto justify-center p-6">
  
        {serverData.dtoList.map(location =>
  /*
        <div
        key= {location.showlocation} 
        className="w-full min-w-[400px]  p-2 m-2 rounded shadow-md"
        onClick={() => moveToRead(location.showlocation, "location")} //이벤트 처리 추가 
        > 
*/
        <div
        key= {location.showlocation} 
        className="w-full min-w-[400px]  p-2 m-2 rounded shadow-md"
        onClick={() => {
  console.log(location.showlocation);  // showlocation 값 로그 확인
  moveToRead(location.showlocation, "location");
}} 
        > 
  
          <div className="flex ">
            <div className="font-extrabold text-2xl p-2 w-1/12">
              {location.showlocation}
            </div>
            <div className="text-1xl m-1 p-2 w-8/12 font-extrabold">
              {location.facilityId}
            </div>
            <div className="text-1xl m-1 p-2 w-2/10 font-medium">
              {location.locationName}
            </div>
            <div className="text-1xl m-1 p-2 w-2/10 font-medium">
              {location.locationAddress}
            </div>
          </div>
        </div>
        )}
      </div>
        <PageComponent serverData={serverData} movePage={(pageParam) => moveToList(pageParam, "location")}></PageComponent>
    </div>
    );
}

export default ListComponent;