import { useEffect, useState } from "react";
import { getList } from "../../../api/showInfoApi";
import useCustomMove from "../../../hooks/useCustomMove";
import PageComponent from "../../common/PageComponent";

const initState = {
  dtoList: [],
  pageNumList: [],
  pageRequestDTO: null,
  prev: false,
  next: false,
  totalCount: 0,
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
  
        {serverData.dtoList.map(showInfo =>
  
        <div
        key= {showInfo.showInfo} 
        className="w-full min-w-[400px]  p-2 m-2 rounded shadow-md"
        onClick={() => moveToRead(showInfo.showInfo, "showinfo")} //이벤트 처리 추가 
        >  
  
          <div className="flex ">
            <div className="font-extrabold text-2xl p-2 w-1/12">
              {showInfo.showInfo}
            </div>
            <div className="text-1xl m-1 p-2 w-8/12 font-extrabold">
              {showInfo.showName}
            </div>
          </div>
        </div>
        )}
      </div>
        <PageComponent serverData={serverData} movePage={(pageParam) => moveToList(pageParam,"showinfo")}></PageComponent>
    </div>
    );
}

export default ListComponent;