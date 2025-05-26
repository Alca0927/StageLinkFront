import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import BasicLayout from "../../layouts/BasicLayout";

const MemberMainPage = () => {
  const [memberCount, setMemberCount] = useState(0);
  const [reportCount, setReportCount] = useState(0);
  const location = useLocation();

  useEffect(() => {
    fetch("/api/members/count")
      .then((res) => res.json())
      .then((data) => setMemberCount(data.count || 0));

    fetch("/api/reports/count")
      .then((res) => res.json())
      .then((data) => setReportCount(data.count || 0));
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
