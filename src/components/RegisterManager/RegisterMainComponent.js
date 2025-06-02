import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getRegistermanager } from "../../api/mainPageApi";

const RegisterMainPage = () => {
  const [bookingCount, setBookingCount] = useState(0);
  const [refundCount, setRefundCount] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const fetchShowData = async () => {
        try {
        const data = await getRegistermanager();
        console.log("공지 & QnA API :", data);
        setBookingCount(data.bookingCount || 0);
        setRefundCount(data.refundCount || 0);
        } catch (err) {
        console.error("공지 & QnA 에러 발생:", err);
        }
    };

    fetchShowData();
  }, []);

  const isRootPath = location.pathname === "/admin/registermanager";

  return (
    <>
      {isRootPath && (
        <div className="flex flex-col items-center justify-center h-full space-y-10 py-10">
          <div className="flex flex-row justify-center items-center gap-20 text-center">
            <div>
              <h2 className="text-2xl font-semibold text-gray-700">총 예매 수</h2>
              <p className="text-5xl font-bold text-indigo-600 mt-2">{bookingCount}</p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-700">총 환불 수</h2>
              <p className="text-5xl font-bold text-pink-500 mt-2">{refundCount}</p>
            </div>
          </div>
        </div>
      )}
      
    </>
  );
};

export default RegisterMainPage;
