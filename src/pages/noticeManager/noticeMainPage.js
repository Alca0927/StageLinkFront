import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import BasicLayout from "../../layouts/BasicLayout";

const NoticeMainPage = () => {
  const [noticeCount, setNoticeCount] = useState(0);
  const [qnaCount, setQnaCount] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    fetch("/api/admin/noticemanager", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log("Notice API response:", data);
        setNoticeCount(data.noticeCount || 0);
        setQnaCount(data.qnaCount || 0);
      })
      .catch((err) => {
        console.error("Error fetching notice summary:", err);
      });
  }, []);

  const isRootPath = location.pathname === "/admin/noticemanager";

  return (
    <BasicLayout>
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
      <Outlet />
    </BasicLayout>
  );
};

export default NoticeMainPage;
