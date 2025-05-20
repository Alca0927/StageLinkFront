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
  totoalCount: 0,
  prevPage: 0,
  nextPage: 0,
  totalPage: 0,
  current: 0
};

const ListComponent = () => {
  const { page, size, refresh, moveToList, moveToRead } = useCustomMove();
  const [serverData, setServerData] = useState(initState);

  useEffect(() => {
    getList({ page, size })
      .then(data => {
        console.log(data);
        setServerData(data || initState); // null 또는 undefined 방지
      })
      .catch(error => {
        console.error("데이터 불러오기 실패:", error);
        setServerData(initState); // 에러 시 초기값 유지
      });
  }, [page, size, refresh]);

  return (
    <div className="border-2 border-blue-100 mt-10 mr-2 ml-2">
      <div className="flex flex-wrap mx-auto justify-center p-6">
        {Array.isArray(serverData.dtoList) && serverData.dtoList.length === 0 ? (
          <div className="text-center text-xl font-bold">
            <p>신고된 게시글이 없습니다.</p>
          </div>
        ) : (
          Array.isArray(serverData.dtoList) &&
          serverData.dtoList.map(report => (
            <div
              key={report.REPORT_NO}
              className="w-full min-w-[400px] p-2 m-2 rounded shadow-md"
              onClick={() => {
                console.log(report.REPORT_NO);
                moveToRead(report.REPORT_NO, "report");
              }}
            >
              <div className="flex">
                <div className="font-extrabold text-2xl p-2 w-1/12">
                  {report.REPORT_NO}
                </div>
                <div className="text-1xl m-1 p-2 w-8/12 font-extrabold">
                  {report.POST_NO}
                </div>
                <div className="text-1xl m-1 p-2 w-2/10 font-medium">
                  {report.REPORTER_ID}
                </div>
                <div className="text-1xl m-1 p-2 w-2/10 font-medium">
                  {report.REPORT_REASON}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <PageComponent
        serverData={serverData}
        movePage={() => moveToList(null, "report")}
      />
    </div>
  );
};

export default ListComponent;
