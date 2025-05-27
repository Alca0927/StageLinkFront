import { useEffect, useState } from "react";
import { getList } from "../../../api/actorApi";
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
      console.log('useEffect 실행됨 - pageParam 변경:', page,size);
      getList({page,size}).then(data => {
        console.log('API 응답 데이터:',data)
        console.log('새로운 current 페이지:', data.current);
        setServerData(data)
      })
    }, [page,size,refresh])

    
    return (
      <div className="border-2 border-blue-100 mt-10 mr-2 ml-2">
  
      <div className="flex flex-wrap mx-auto justify-center p-6">
  
        {serverData.dtoList.map(actor =>
  
        <div
        key= {actor.actorNo} 
        className="w-full min-w-[400px]  p-2 m-2 rounded shadow-md"
        onClick={() => moveToRead(actor.actorNo, "actor")} //이벤트 처리 추가 
        >  
  
          <div className="flex ">
            <div className="font-extrabold text-2xl p-2 w-1/12">
              {actor.actorNo}
            </div>
            <div className="text-1xl m-1 p-2 w-8/12 font-extrabold">
              {actor.actorImage}
            </div>
            <div className="text-1xl m-1 p-2 w-2/10 font-medium">
              {actor.actorName}
            </div>
            <div className="text-1xl m-1 p-2 w-2/10 font-medium">
              {actor.actorProfile}
            </div>
          </div>
        </div>
        )}
      </div>
        <PageComponent serverData={serverData} movePage={(pageParam) => moveToList(pageParam, "actor")}></PageComponent>
    </div>
    );
}

export default ListComponent;