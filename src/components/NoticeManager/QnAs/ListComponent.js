import { useEffect, useState } from "react";
import { getQnaList } from "../../../api/qnaApi";
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
  current: 0,
};

const ListComponent = () => {
  const { page, size, refresh, moveToList, moveToRead } = useCustomMove();
  const [serverData, setServerData] = useState(initState);
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    console.log("🔄 [useEffect] Q&A 목록 요청 시작");
    console.log("👉 파라미터:", { page, size, searchKeyword });

    getQnaList({ page, size, question: searchKeyword })
      .then((data) => {
        console.log("✅ Q&A 목록 응답 도착:", data);

        if (data && Array.isArray(data.dtoList)) {
          setServerData(data);
        } else {
          console.warn("⚠️ dtoList가 없거나 배열이 아닙니다. 빈 목록 설정");
          setServerData({ ...initState, dtoList: [] });
        }
      })
      .catch((err) => {
        console.error("❌ Q&A 목록 조회 실패:", err);
      });
  }, [page, size, refresh, searchKeyword]);

  const handleSearch = () => {
    console.log("🔍 [handleSearch] 검색어:", searchKeyword);
    moveToList(1, "Q&A", { question: searchKeyword });
  };
  
  return (
    <div>
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="질문 내용 검색..."
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

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase">Q&A 번호</th>
              <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase">회원 번호</th>
              <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase">질문</th>
              <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase">답변 상태</th>
              <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase">작성일</th>
              <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase">평점</th>
            </tr>
          </thead>
          <tbody>
            {!Array.isArray(serverData.dtoList) || serverData.dtoList.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                  🔍 검색 결과가 없습니다.
                </td>
              </tr>
            ) : (
              serverData.dtoList.map((item) => (
                <tr
                  key={item.questionNo}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => {
                    console.log("➡️ 상세보기 이동:", item.questionNo);
                    moveToRead(`${item.questionNo}`, "qna");
                  }}
                >
                  <td className="px-6 py-4 border-b text-sm">{item.questionNo}</td>
                  <td className="px-6 py-4 border-b text-sm">{item.memberNo}</td>
                  <td className="px-6 py-4 border-b text-sm truncate max-w-xs">
                    {item.questionContents}
                  </td>
                  <td className="px-6 py-4 border-b text-sm">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        item.answerContents
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {item.answerContents ? "답변완료" : "답변대기"}
                    </span>
                  </td>
                  <td className="px-6 py-4 border-b text-sm">
                    {item.createDate
                      ? new Date(item.createDate).toLocaleDateString("ko-KR")
                      : "미정"}
                  </td>
                  <td className="px-6 py-4 border-b text-sm">
                    {item.qnaRating ? `⭐ ${item.qnaRating}` : "-"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <PageComponent
        serverData={serverData}
        movePage={(pageParam) => {
          console.log("📄 페이지 이동 요청:", pageParam);
          moveToList(pageParam, "qna", { question: searchKeyword });
        }}
      />
    </div>
  );
};

export default ListComponent;
