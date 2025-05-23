import { useEffect, useState } from "react";
import { getList } from "../../../api/refundApi";
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
  
        {serverData.dtoList.map(refund =>

        <div
        key= {refund.refundNo} 
          className="w-full min-w-[400px]  p-2 m-2 rounded shadow-md"
          onClick={() => {
          console.log(refund.refundNo);  // showlocation 값 로그 확인
          moveToRead(refund.refundNo, "refund"); }} > 
  
          <div className="flex ">
            <div className="font-extrabold text-2xl p-2 w-1/12">
              {refund.refundNo}
            </div>
            <div className="text-1xl m-1 p-2 w-8/12 font-extrabold">
              {refund.member}
            </div>
            <div className="text-1xl m-1 p-2 w-2/10 font-medium">
              {refund.reservation}
            </div>
            <div className="text-1xl m-1 p-2 w-2/10 font-medium">
              {refund.seat}
            </div>
            <div className="text-1xl m-1 p-2 w-2/10 font-medium">
              {refund.refundDate}
            </div>
          </div>
        </div>
        )}
      </div>
        <PageComponent serverData={serverData} movePage={() => moveToList(null, "refund")}></PageComponent>
    </div>
    );
}

export default ListComponent;