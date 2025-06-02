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
  totalCount: 0, 
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
      <div className="max-w-6xl mx-auto mt-10 px-4">
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 border text-center">예약번호</th>
                <th className="px-4 py-3 border text-center">회원정보</th>
                <th className="px-4 py-3 border text-center">공연</th>
                <th className="px-4 py-3 border text-center">좌석</th>
                <th className="px-4 py-3 border text-center">예약일</th>
                <th className="px-4 py-3 border text-center">상태</th>
              </tr>
            </thead>
            <tbody>
              {serverData.dtoList.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center text-gray-500 py-6">
                    🔍 데이터가 없습니다.
                  </td>
                </tr>
              ) : (
                serverData.dtoList.map(reservation => (
                  <tr
                    key={reservation.reservationNo}
                    onClick={() => {
                      console.log(reservation.reservationNo);
                      moveToRead(reservation.reservationNo, "reservation");
                    }}
                    className="cursor-pointer hover:bg-blue-50 transition-colors"
                  >
                    <td className="px-4 py-3 border text-center font-bold">
                      {reservation.reservationNo}
                    </td>
                    <td className="px-4 py-3 border text-center">
                      {reservation.member?.name || reservation.member?.nickname || reservation.member?.userId || '회원정보없음'}
                    </td>
                    <td className="px-4 py-3 border text-center">
                      {typeof reservation.show === 'object' ? reservation.show?.showInfo?.showName || reservation.show?.showName : reservation.show}
                    </td>
                    <td className="px-4 py-3 border text-center">
                      {typeof reservation.seat === 'object' ? reservation.seat?.seatNumber || reservation.seat?.seatId : reservation.seat}
                    </td>
                    <td className="px-4 py-3 border text-center">
                      {reservation.reservationDate}
                    </td>
                    <td className="px-4 py-3 border text-center">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        reservation.status === 'CONFIRMED' ? 'bg-green-100 text-green-800' :
                        reservation.status === 'CANCELED' ? 'bg-red-100 text-red-800' :
                        reservation.status === 'TEMP' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {reservation.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        <PageComponent 
          serverData={serverData} 
          movePage={(pageParam) => 
            moveToList(pageParam, "reservation")
          }
        />
      </div>
    );
}

export default ListComponent;