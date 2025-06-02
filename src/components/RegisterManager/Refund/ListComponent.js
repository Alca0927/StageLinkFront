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
                <th className="px-4 py-3 border text-center">환불번호</th>
                <th className="px-4 py-3 border text-center">회원번호</th>
                <th className="px-4 py-3 border text-center">예약번호</th>
                <th className="px-4 py-3 border text-center">좌석ID</th>
                <th className="px-4 py-3 border text-center">좌석등급</th>
                <th className="px-4 py-3 border text-center">좌석번호</th>
                <th className="px-4 py-3 border text-center">환불일</th>
              </tr>
            </thead>
            <tbody>
              {serverData.dtoList.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center text-gray-500 py-6">
                    🔍 데이터가 없습니다.
                  </td>
                </tr>
              ) : (
                serverData.dtoList.map(refund => (
                  <tr
                    key={refund.refundNo}
                    onClick={() => {
                      console.log(refund.refundNo);
                      moveToRead(refund.refundNo, "refund");
                    }}
                    className="cursor-pointer hover:bg-blue-50 transition-colors"
                  >
                    <td className="px-4 py-3 border text-center font-bold">
                      {refund.refundNo}
                    </td>
                    <td className="px-4 py-3 border text-center">
                      {refund.member?.memberNo || refund.member}
                    </td>
                    <td className="px-4 py-3 border text-center">
                      {refund.reservation?.reservationNo || refund.reservation}
                    </td>
                    <td className="px-4 py-3 border text-center">
                      {refund.seat?.seatId || refund.seat}
                    </td>
                    <td className="px-4 py-3 border text-center">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        refund.seat?.seatClass === 'VIP' ? 'bg-purple-100 text-purple-800' :
                        refund.seat?.seatClass === 'R석' ? 'bg-blue-100 text-blue-800' :
                        refund.seat?.seatClass === 'S석' ? 'bg-green-100 text-green-800' :
                        refund.seat?.seatClass === 'A석' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {refund.seat?.seatClass || '-'}
                      </span>
                    </td>
                    <td className="px-4 py-3 border text-center">
                      {refund.seat?.seatNumber || '-'}
                    </td>
                    <td className="px-4 py-3 border text-center">
                      {refund.refundDate}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        <PageComponent 
          serverData={serverData} 
          movePage={(pageParam) => moveToList(pageParam, "refund")}
        />
      </div>
    );
}

export default ListComponent;