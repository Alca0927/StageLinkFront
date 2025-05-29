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
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    getList({ page, size, name: searchKeyword }).then((data) => {
      console.log("📋 배우-공연 리스트 응답:", data);
      setServerData(data);
    });
  }, [page, size, refresh]);


  const handleSearch = () => {
    moveToList(1, "actorshow", { name: searchKeyword });
  };

  const handleAdd = () => {
    moveToAdd("actorshow")
  }

  return (
    <div className="flex max-w-6xl mx-auto mt-8">
      <div className="w-full">
        {/* 검색창 */}
        <div className="mb-4 flex items-center gap-4">
          <input
            type="text"
            placeholder="배우명 또는 공연명 검색"
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

        <button onClick={handleAdd}>배우 출연작 추가</button>

        {/* 테이블 */}
        <table className="w-full table-fixed border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="w-1/12 px-4 py-2 border text-center">배우번호</th>
              <th className="w-2/12 px-4 py-2 border text-center">배우명</th>
              <th className="w-3/12 px-4 py-2 border text-center">공연명</th>
              <th className="w-2/12 px-4 py-2 border text-center">배역명</th>
              <th className="w-3/12 px-4 py-2 border text-center">기간</th>
            </tr>
          </thead>
          <tbody>
            {serverData.dtoList.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center text-gray-500 py-4">
                  🔍 검색 결과가 없습니다.
                </td>
              </tr>
            ) : (
              serverData.dtoList.map((item) => (
                <tr
                  key={`${item.actorDTO.actorNo}_${item.showInfoDTO.showInfo}`}
                  className="bg-gray-100 cursor-pointer"
                  onClick={() =>
                    moveToRead(`${item.actorDTO.actorNo}/${item.showInfoDTO.showInfo}`, "actorshow")
                  }
                >
                  <td className="px-4 py-2 border text-center">{item.actorDTO.actorNo}</td>
                  <td className="px-4 py-2 border text-center">{item.actorDTO.actorName}</td>
                  <td className="px-4 py-2 border text-center">{item.showInfoDTO.showName}</td>
                  <td className="px-4 py-2 border text-center">{item.roleName}</td>
                  <td className="px-4 py-2 border text-center">
                    {item.showStartTime && item.showEndTime
                      ? `${item.showStartTime} ~ ${item.showEndTime}`
                      : item.showStartTime || item.showEndTime || "미정"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* 페이지네이션 */}
        <PageComponent
          serverData={serverData}
          movePage={(pageParam) => moveToList(pageParam, "actorshow")}
        />
      </div>
    </div>
  );
};

export default ListComponent;
