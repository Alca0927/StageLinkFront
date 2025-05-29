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
};

const ListComponent = () => {
  const { page, size, refresh, moveToList, moveToRead } = useCustomMove();
  const [serverData, setServerData] = useState(initState);
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    getList({ page, size, name: searchKeyword }).then((data) => {
      console.log("🔥 서버 응답:", data);
      setServerData(data);
    });
  }, [page, size, refresh, searchKeyword]);

  const handleSearch = () => {
    moveToList(1, "showinfo", { name: searchKeyword });
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">

      {/* 검색창 */}
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

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 border text-center">상세 ID</th>
              <th className="px-4 py-3 border text-center">공연명</th>
            </tr>
          </thead>
          <tbody>
            {serverData.dtoList.length === 0 ? (
              <tr>
                <td colSpan="2" className="text-center text-gray-500 py-6">
                  🔍 데이터가 없습니다.
                </td>
              </tr>
            ) : (
              serverData.dtoList.map((showInfo) => (
                <tr
                  key={showInfo.showInfo}
                  onClick={() => moveToRead(showInfo.showInfo, "showinfo")}
                  className="cursor-pointer hover:bg-blue-50 transition-colors"
                >
                  <td className="px-4 py-3 border text-center">{showInfo.showInfo}</td>
                  <td className="px-4 py-3 border text-center">{showInfo.showName}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <PageComponent serverData={serverData} movePage={(pageParam) => moveToList(pageParam,"showinfo")}></PageComponent>
    </div>
  );
};

export default ListComponent;
