import { useEffect, useState } from "react";
import { getList } from "../../../api/reservationApi";
import useCustomMove from "../../../hooks/useCustomMove";
import PageComponent from "../../common/PageComponent";

const initState = {
  dtoList: [],
  pageNumList: [],
  pageRequestDTO: null,
  prev: false,
  next: false,
  totalCount: 0, // totoalCount -> totalCount 오타 수정
  prevPage: 0,
  nextPage: 0,
  totalPage: 0,
  current: 0
}

const ListComponent = () => {
    const {page, size, refresh, moveToList, moveToRead} = useCustomMove()
    const [serverData, setServerData] = useState(initState)

    useEffect(() => {
      getList({page, size}).then(data => {
        console.log(data)
        setServerData(data)
      })
    }, [page, size, refresh])

    return (
      <div className="border-2 border-blue-100 mt-10 mr-2 ml-2">
        <div className="flex flex-wrap mx-auto justify-center p-6">
          {serverData.dtoList.map(reservation =>
            <div key={reservation.reservationNo} 
              className="w-full min-w-[400px] p-2 m-2 rounded shadow-md cursor-pointer hover:bg-gray-50"
              onClick={() => {
                console.log(reservation.reservationNo);
                moveToRead(reservation.reservationNo, "reservation");
              }}> 
              <div className="flex">
                <div className="font-extrabold text-2xl p-2 w-1/12">
                  {reservation.reservationNo}
                </div>
                <div className="text-1xl m-1 p-2 w-8/12 font-extrabold">
                  {/* member 객체에서 적절한 속성을 선택해서 표시 */}
                  {reservation.member?.name || reservation.member?.nickname || reservation.member?.userId || '회원정보없음'}
                </div>
                <div className="text-1xl m-1 p-2 w-2/10 font-medium">
                  {/* show도 객체일 가능성이 있으니 확인 */}
                  {typeof reservation.show === 'object' ? reservation.show?.title || reservation.show?.name : reservation.show}
                </div>
                <div className="text-1xl m-1 p-2 w-2/10 font-medium">
                  {/* seat도 객체일 가능성이 있으니 확인 */}
                  {typeof reservation.seat === 'object' ? reservation.seat?.seatNumber || reservation.seat?.seatId : reservation.seat}
                </div>
                <div className="text-1xl m-1 p-2 w-2/10 font-medium">
                  {reservation.reservationDate}
                </div>
                <div className="text-1xl m-1 p-2 w-2/10 font-medium">
                  {reservation.status}
                </div>
              </div>
            </div>
          )}
        </div>
        <PageComponent 
          serverData={serverData} 
          movePage={(pageParam) => 
        moveToList(pageParam, "reservation")}
        />
      </div>
    );
}


export default ListComponent;