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
  const [error, setError] = useState(null);

  const fetchData = (question = '') => {
    const params = question.trim()
    ?{page, size, question}
    : {page, size};

    getQnaList(params)
      .then((data) => {
        console.log("서버 응답 : ", data);
        setServerData(data);
        setError(null);
      })
      .catch((error) => {
        console.error(" QnA 목록 조회 실패 : ", error);
        const message = "서버와의 연결에 문제가 있습니다.";
        setServerData(initState);
        setError(message);
      })
  }

  useEffect(() => {
    fetchData();
  }, [page, size, refresh]);

  const handleSearch = () => {
    console.log("검색어 검색어 : ",searchKeyword)
    fetchData(searchKeyword);
    moveToList(1, "Q&A", searchKeyword.trim()
      ?{ question: searchKeyword}
      : {});
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter'){
      handleSearch();
    }
  };

  return (
    <div className="flex mx-auto mt-8">
      <div className="w-full">
        {/* 검색창 */}
        <div className="mb-4 flex items-center gap-4">
          <input
            type="text"
            placeholder="질문 내용 검색..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            onKeyDown={handleKeyDown}
            className="border px-3 py-2 rounded w-64"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            검색
          </button>
        </div>

        {/* 테이블 */}
        <div className="overflow-x-auto">
          <table className="w-full table-fixed border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="w-1/12 px-4 py-2 border text-center">Q&A 번호</th>
                <th className="w-1/12 px-4 py-2 border text-center">회원 번호</th>
                <th className="w-4/12 px-4 py-2 border text-center">질문</th>
                <th className="w-1/12 px-4 py-2 border text-center">답변 상태</th>
                <th className="w-2/12 px-4 py-2 border text-center">작성일</th>
                <th className="w-1/12 px-4 py-2 border text-center">평점</th>
              </tr>
            </thead>
            <tbody>
              {error ? (
                <tr>
                  <td colSpan="6" className="text-center text-red-500 py-4">
                    ⚠ {error}
                  </td>
                </tr>
              ) : !Array.isArray(serverData.dtoList) || serverData.dtoList.length === 0 ? (
                <tr className="bg-gray-100">
                  <td colSpan="6" className="text-center text-gray-500 py-4">
                    🔍 검색 결과가 없습니다.
                  </td>
                </tr>
              ) : (
                serverData.dtoList.map((item) => (
                  <tr
                    key={item.questionNo}
                    className="bg-gray-100 cursor-pointer hover:bg-gray-200"
                    onClick={() => {
                      console.log("➡️ 상세보기 이동:", item.questionNo);
                      moveToRead(`${item.questionNo}`, "qna");
                    }}
                  >
                    <td className="px-4 py-2 border text-center">{item.questionNo}</td>
                    <td className="px-4 py-2 border text-center">{item.memberNo}</td>
                    <td className="px-4 py-2 border text-center truncate">
                      {item.questionContents}
                    </td>
                    <td className="px-4 py-2 border text-center">
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
                    <td className="px-4 py-2 border text-center">
                      {item.createDate
                        ? new Date(item.createDate).toLocaleDateString("ko-KR")
                        : "미정"}
                    </td>
                    <td className="px-4 py-2 border text-center">
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
          movePage={(pageParam) => moveToList(pageParam, "Q&A")}
        />
      </div>
    </div>
  );
};

export default ListComponent;