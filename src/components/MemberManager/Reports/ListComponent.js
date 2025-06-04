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

  // ✅ 검색어와 함께 데이터를 가져오는 함수
  const fetchData = (reason = '') => {
    const params = reason.trim()
      ? { page, size, reason }
      : { page, size };

    console.log("📌 디버깅: page =", page, "size =", size, "reason =", reason);

    getList(params)
      .then((data) => {
        console.log("📋 불법 신고 리스트 응답 전체:", data);
        setServerData({
          ...initState,           // 기본값을 먼저
          ...data,               // API 응답으로 덮어쓰기
          dtoList: data?.content || [],  // content를 dtoList로 매핑
          totalCount: data?.totalElements || 0,
          totalPage: data?.totalPages || 0,
          current: data?.pageable?.pageNumber || 0
        });
      })
      .catch((error) => {
        console.error("🔥 getList API 호출 실패:", error);
        setServerData(initState);
      });
  };

  // ✅ 페이지 로딩 시 전체 목록 (검색어 없이)
  useEffect(() => {
    fetchData(); // 검색어 없이 호출
  }, [page, size, refresh]);

  // ✅ 검색 버튼 클릭 시 실행
  const handleSearch = () => {
    console.log("🔍 검색 버튼 클릭됨 - 키워드:", searchKeyword);
    fetchData(searchKeyword); // 검색어와 함께 데이터 가져오기
    moveToList(1, "reports", searchKeyword.trim() 
      ? { reason: searchKeyword } 
      : {});
  };

  // ✅ Enter 키 검색 지원
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="mt-10 mr-2">
      <div className="flex flex-wrap mx-auto p-6">

        {/* 검색창 */}
        <div className="w-full mb-4 flex items-center gap-2">
          <input
            type="text"
            placeholder="신고 사유로 검색"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            onKeyDown={handleKeyDown}
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
              {!Array.isArray(serverData.dtoList) || serverData.dtoList.length === 0 ? (
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
                    onClick={() => {
                      console.log("📎 클릭된 신고 항목:", item);
                      moveToRead(`${item.reportNo}`, "reports");
                    }}
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
      </div>
      
      {/* ✅ 페이지네이션에서 검색 상태 유지 */}
      <PageComponent 
        serverData={serverData} 
        movePage={(pageParam) => 
          moveToList(pageParam, "reports", searchKeyword.trim() 
            ? { reason: searchKeyword } 
            : {})
        }
      />
    </div>
  );
};

export default ReportListComponent;