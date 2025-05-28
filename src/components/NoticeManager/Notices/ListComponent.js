import { useEffect, useState } from "react";
import { getList } from "../../../api/noticeApi";
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

const NoticeListComponent = () => {
  const { page, size, refresh, moveToList, moveToRead } = useCustomMove();
  const [serverData, setServerData] = useState(initState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getList({ page, size })
      .then((data) => {
        console.log("📋 공지사항 리스트 응답:", data);
        setServerData(data);
      })
      .catch((err) => {
        console.error("❌ 공지사항 불러오기 실패:", err);
        setServerData(initState);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [page, size, refresh]);

  return (
    <div className="border-2 border-blue-200 mt-10 mr-2">
      <div className="flex flex-wrap mx-auto p-6">
        
        {/* 제목 */}
        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold text-center">공지사항</h1>
        </div>

        {/* 테이블 */}
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="p-4 border text-center w-1/12">번호</th>
                <th className="p-4 border w-8/12">제목</th>
                <th className="p-4 border text-center w-3/12">작성일</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="3" className="text-center p-8 text-gray-500">
                    로딩 중...
                  </td>
                </tr>
              ) : serverData.dtoList.length === 0 ? (
                <tr>
                  <td colSpan="3" className="text-center p-8 text-gray-500">
                    🔍 공지사항이 없습니다.
                  </td>
                </tr>
              ) : (
                serverData.dtoList.map((notice) => (
                  <tr
                    key={notice.noticeNo}
                    className="border-b hover:bg-gray-50 cursor-pointer"
                    onClick={() =>
                      moveToRead(`${notice.noticeNo}`, "notices")
                    }
                  >
                    <td className="p-4 border text-center">{notice.noticeNo}</td>
                    <td className="p-4 border break-words">{notice.noticeTitle}</td>
                    <td className="p-4 border text-center">
                      {notice.noticeDate ? new Date(notice.noticeDate).toLocaleDateString('ko-KR') : ''}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* 페이지네이션 */}
        <PageComponent
          serverData={serverData}
          movePage={(pageParam) => moveToList(pageParam, "notices")}
        />
      </div>
    </div>
  );
};

export default NoticeListComponent;