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
  current: 0,
};

const ListComponent = () => {
  const { page, size, refresh, moveToList, moveToRead } = useCustomMove();
  const [serverData, setServerData] = useState(initState);
  const [searchKeyword, setSearchKeyword] = useState("");
  const fixedSearchType = "l"; // 장소명 검색 고정

  const fetchData = (keyword = "") => {
    const params = keyword.trim()
      ? { page, size, type: fixedSearchType, keyword }
      : { page, size };
    getList(params).then((data) => setServerData(data));
  };

  useEffect(() => {
    fetchData(); // 전체 조회
  }, [page, size, refresh]);

  const handleSearch = () => {
    fetchData(searchKeyword);
    moveToList(1, "location", searchKeyword.trim()
      ? { type: fixedSearchType, keyword: searchKeyword }
      : {});
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      {/* 검색창 */}
      <div className="mb-4 flex items-center gap-4">
        <input
          type="text"
          placeholder="장소명으로 검색"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="border px-3 py-2 rounded w-64"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          검색
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 border text-center">장소 ID</th>
              <th className="px-4 py-3 border text-center">시설 ID</th>
              <th className="px-4 py-3 border text-center">장소명</th>
              <th className="px-4 py-3 border text-center">주소</th>
            </tr>
          </thead>
          <tbody>
            {serverData.dtoList.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center text-gray-500 py-6">
                  🔍 데이터가 없습니다.
                </td>
              </tr>
            ) : (
              serverData.dtoList.map((location) => (
                <tr
                  key={location.showlocation}
                  onClick={() => moveToRead(location.showlocation, "location")}
                  className="cursor-pointer hover:bg-blue-50 transition-colors"
                >
                  <td className="px-4 py-3 border text-center">{location.showlocation}</td>
                  <td className="px-4 py-3 border text-center">{location.facilityId}</td>
                  <td className="px-4 py-3 border text-center">{location.locationName}</td>
                  <td className="px-4 py-3 border text-center">{location.locationAddress}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <PageComponent
        serverData={serverData}
        movePage={(pageParam) =>
          moveToList(pageParam, "location", searchKeyword.trim()
            ? { type: fixedSearchType, keyword: searchKeyword }
            : {})
        }
      />
    </div>
  );
};

export default ListComponent;
