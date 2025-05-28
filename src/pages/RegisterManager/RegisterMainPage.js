import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import BasicLayout from "../../layouts/BasicLayout";

const RegisterMainPage = () => {
  const [bookingCount, setBookingCount] = useState(0);
  const [refundCount, setRefundCount] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    fetch("/api/admin/bookingmanager", {
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
        console.log("Booking API response:", data);
        setBookingCount(data.bookingCount || 0);
        setRefundCount(data.refundCount || 0);
      })
      .catch((err) => {
        console.error("Error fetching booking summary:", err);
      });
  }, []);

  const isRootPath = location.pathname === "/admin/registermanager";

  return (
    <BasicLayout>
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
      <Outlet />
    </BasicLayout>
  );
};

export default RegisterMainPage;
