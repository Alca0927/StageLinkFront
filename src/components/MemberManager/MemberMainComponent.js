import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getMembermanager } from "../../api/mainPageApi";

const MemberMainComponent = () => {
  const [memberCount, setMemberCount] = useState(0);
  const [reportCount, setReportCount] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const fetchMemberData = async () => {
      try{
        const data = await getMembermanager();
        console.log("회원 메인 페이지 API : ", data);
        setMemberCount(data.memberCount || 0);
        setReportCount(data.reportCount || 0);
      } catch (err) {
        console.error("회원 메인 페이지 에러 발생 : ", err)
      }
    };

    fetchMemberData();
  }, []);

  const isRootPath = location.pathname === "/admin/membermanager";

  return (
    <>
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
    </>
  );
};

export default MemberMainComponent;
