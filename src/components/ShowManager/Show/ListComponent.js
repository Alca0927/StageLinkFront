import { useEffect, useState } from "react";
import { getList } from "../../../api/showApi";
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

  const [searchKeyword, setSearchKeyword] = useState("");
  const [serverData, setServerData] = useState(initState);
  const fixedSearchType = "t"; // 공연명 고정

  // ✅ 페이지 이동, 새로고침, 검색 실행 시에만 호출됨
  const fetchData = (keyword = "") => {
    const params = keyword.trim()
      ? { page, size, type: fixedSearchType, keyword }
      : { page, size };

    getList(params).then((data) => {
      setServerData(data);
    });
  };

  // ✅ 페이지 로딩 시 전체 목록
  useEffect(() => {
    fetchData(); // keyword 없이 호출
  }, [page, size, refresh]);

  // ✅ 검색 버튼 누를 때 실행
  const handleSearch = () => {
    fetchData(searchKeyword);
    moveToList(1, "show", searchKeyword.trim()
      ? { type: fixedSearchType, keyword: searchKeyword }
      : {});
  };

  const handleAdd = () => {
    moveToAdd("show");
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">

      {/* 🔍 검색창 */}
      <div className="mb-4 flex items-center gap-4">
        <input
          type="text"
          placeholder="공연명으로 검색"
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

      {/* 공연 추가 버튼 */}
      <div className="mb-4">
        <button
          onClick={handleAdd}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          공연 추가
        </button>
      </div>

      {/* 리스트 테이블 */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 border text-center">공연 번호</th>
              <th className="px-4 py-3 border text-center">공연명</th>
              <th className="px-4 py-3 border text-center">공연 장소</th>
              <th className="px-4 py-3 border text-center">상태</th>
            </tr>
          </thead>
          <tbody>
            {serverData.dtoList.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center text-gray-500 py-6">
                  ❌ 결과가 없습니다.
                </td>
              </tr>
            ) : (
              serverData.dtoList.map((show) => (
                <tr
                  key={show.showNo}
                  onClick={() => moveToRead(show.showNo, "show")}
                  className="cursor-pointer hover:bg-blue-50 transition-colors"
                >
                  <td className="px-4 py-3 border text-center">{show.showNo}</td>
                  <td className="px-4 py-3 border text-center">{show.showInfoDTO.showName}</td>
                  <td className="px-4 py-3 border text-center">{show.showInfoDTO.showLocationDTO.locationName}</td>
                  <td className="px-4 py-3 border text-center">{show.showState}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* 페이지네이션 */}
      <PageComponent
        serverData={serverData}
        movePage={(pageParam) =>
          moveToList(pageParam, "show", searchKeyword.trim()
            ? { type: fixedSearchType, keyword: searchKeyword }
            : {})
        }
      />
    </div>
  );
};

export default ListComponent;
