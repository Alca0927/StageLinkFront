import { useEffect, useState } from "react";
import { getList } from "../../../api/actorShowApi";
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
};

const ListComponent = () => {
  const { page, size, refresh, moveToList, moveToRead, moveToAdd } = useCustomMove();
  const [serverData, setServerData] = useState(initState);

  const [searchType, setSearchType] = useState("actor");   // select용
  const [searchKeyword, setSearchKeyword] = useState("");  // input용

  const [searchParams, setSearchParams] = useState({ type: "", keyword: "" }); // 실제 검색 파라미터

  useEffect(() => {
    getList({ page, size, ...searchParams }).then((data) => {
      console.log("📋 배우-공연 리스트 응답:", data);
      setServerData(data);
    });
  }, [page, size, refresh, searchParams]); // 🔥 검색 조건이 아닌 검색 파라미터가 바뀔 때만 동작

  // 버튼 클릭 시 검색 파라미터 반영
  const handleSearch = () => {
    setSearchParams({ type: searchType, keyword: searchKeyword });
  };

  const handleAdd = () => {
    moveToAdd("actorshow");
  };

  return (
    <div className="flex max-w-6xl mx-auto mt-8">
      <div className="w-full">
        {/* 검색창 */}
        <div className="mb-4 flex items-center gap-4">
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            className="border px-2 py-2 rounded"
          >
            <option value="actor">배우명</option>
            <option value="show">공연명</option>
          </select>
          <input
            type="text"
            placeholder="검색어 입력"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className="border px-3 py-2 rounded w-64"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            검색
          </button>
        </div>

         {/* 공연 추가 버튼 */}
        <div className="mb-4">
          <button 
            onClick={handleAdd}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            배우 출연작 추가
          </button>
        </div>
        
        {/* 테이블 */}
        <table className="w-full table-fixed border border-gray-300 text-sm mt-4">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border text-center">배우번호</th>
              <th className="px-4 py-2 border text-center">배우명</th>
              <th className="px-4 py-2 border text-center">공연명</th>
              <th className="px-4 py-2 border text-center">배역명</th>
              <th className="px-4 py-2 border text-center">기간</th>
            </tr>
          </thead>
          <tbody>
            {serverData.dtoList.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">검색 결과가 없습니다.</td>
              </tr>
            ) : (
              serverData.dtoList.map((item) => (
                <tr
                  key={`${item.actorDTO.actorNo}_${item.showInfoDTO.showInfo}`}
                  onClick={() =>
                    moveToRead(`${item.actorDTO.actorNo}/${item.showInfoDTO.showInfo}`, "actorshow")
                  }
                  className="cursor-pointer hover:bg-blue-50 transition-colors"
                >
                  <td className="px-4 py-2 border text-center">{item.actorDTO.actorNo}</td>
                  <td className="px-4 py-2 border text-center">{item.actorDTO.actorName}</td>
                  <td className="px-4 py-2 border text-center">{item.showInfoDTO.showName}</td>
                  <td className="px-4 py-2 border text-center">{item.roleName}</td>
                  <td className="px-4 py-2 border text-center">
                    {item.showStartTime} ~ {item.showEndTime}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* 페이지네이션 */}
        <PageComponent
          serverData={serverData}
          movePage={(pageParam) =>
            moveToList(pageParam, "actorshow", searchParams)
          }
        />
      </div>
    </div>
  );
};

export default ListComponent;
