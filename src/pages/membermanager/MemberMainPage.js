import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import BasicLayout from "../../layouts/BasicLayout";

const MemberMainPage = () => {
  const [memberCount, setMemberCount] = useState(0);
  const [reportCount, setReportCount] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("accessToken"); // ⬅️ 로그인 시 저장된 토큰 불러오기
    if (!token) return;

    fetch("/api/admin/membermanager", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` // ⬅️ JWT 토큰을 Authorization 헤더에 추가
      }
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log("Summary API response:", data);
        setMemberCount(data.memberCount || 0);
        setReportCount(data.reportCount || 0);
      })
      .catch((err) => {
        console.error("Error fetching member summary:", err);
      });
  }, []);

  const isRootPath = location.pathname === "/admin/membermanager";

  return (
    <BasicLayout>
      {isRootPath && (
        <div className="flex flex-col items-center justify-center h-full space-y-10 py-10">
          <div className="flex flex-row justify-center items-center gap-20 text-center">
            <div>
              <h2 className="text-2xl font-semibold text-gray-700">총 회원 수</h2>
              <p className="text-5xl font-bold text-blue-600 mt-2">{memberCount}</p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-700">총 신고 수</h2>
              <p className="text-5xl font-bold text-red-500 mt-2">{reportCount}</p>
            </div>
          </div>
        </div>
      )}
      <Outlet />
    </BasicLayout>
  );
};

export default MemberMainPage;
