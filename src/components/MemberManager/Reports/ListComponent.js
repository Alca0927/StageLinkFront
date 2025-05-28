import { useEffect, useState } from "react";
import { getList } from "../../../api/reportApi";
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

const ReportListComponent = () => {
  const { page, size, refresh, moveToList, moveToRead } = useCustomMove();
  const [serverData, setServerData] = useState(initState);
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    getList({ page, size, reason: searchKeyword }).then((data) => {
      console.log("📋 불법 신고 리스트 응답:", data);
      setServerData(data);
    });
  }, [page, size, refresh]);

  const handleSearch = () => {
    moveToList(1, "reports", { reason: searchKeyword });
  };

  return (
    <div className="border-2 border-blue-200 mt-10 mr-2">
      <div className="flex flex-wrap mx-auto p-6">
        
        {/* 검색창 */}
        <div className="w-full mb-4 flex items-center gap-2">
          <input
            type="text"
            placeholder="신고 사유로 검색"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className="border px-3 py-2 rounded w-64"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            검색
          </button>
        </div>

        {/* 테이블 */}
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="p-4 border">신고 번호</th>
                <th className="p-4 border">신고자 ID</th>
                <th className="p-4 border">게시글 번호</th>
                <th className="p-4 border">신고 사유</th>
              </tr>
            </thead>
            <tbody>
              {serverData.dtoList.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center p-8 text-gray-500">
                    🔍 검색 결과가 없습니다.
                  </td>
                </tr>
              ) : (
                serverData.dtoList.map((item) => (
                  <tr
                    key={item.reportNo}
                    className="border-b hover:bg-gray-50 cursor-pointer"
                    onClick={() =>
                      moveToRead(`${item.reportNo}`, "reports")
                    }
                  >
                    <td className="p-4 border">{item.reportNo}</td>
                    <td className="p-4 border">{item.reportedId}</td>
                    <td className="p-4 border">{item.postNo}</td>
                    <td className="p-4 border">{item.reportReason}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* 페이지네이션 */}
        <PageComponent
          serverData={serverData}
          movePage={(pageParam) => moveToList(pageParam, "reports")}
        />
      </div>
    </div>
  );
};

export default ReportListComponent;