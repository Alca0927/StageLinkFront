import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getNoticemanager } from "../../api/mainPageApi";

const NoticeMainComponent = () => {
  const [noticeCount, setNoticeCount] = useState(0);
  const [qnaCount, setQnaCount] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const fetchShowData = async () => {
          try {
            const data = await getNoticemanager();
            console.log("공지 & QnA API :", data);
            setNoticeCount(data.noticeCount || 0);
            setQnaCount(data.qnaCount || 0);
          } catch (err) {
            console.error("공지 & QnA 에러 발생:", err);
          }
        };
    
        fetchShowData();
  }, []);

  const isRootPath = location.pathname === "/admin/noticemanager";

  return (
    <>
      {isRootPath && (
        <div className="flex flex-col items-center justify-center h-full space-y-10 py-10">
          <div className="flex flex-row justify-center items-center gap-20 text-center">
            <div>
              <h2 className="text-2xl font-semibold text-gray-700">총 공지 수</h2>
              <p className="text-5xl font-bold text-blue-600 mt-2">{noticeCount}</p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-700">총 Q&A 수</h2>
              <p className="text-5xl font-bold text-green-500 mt-2">{qnaCount}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NoticeMainComponent;
