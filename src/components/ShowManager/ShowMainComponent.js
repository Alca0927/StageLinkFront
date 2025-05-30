import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const ShowMainComponent = () => {
  const [showCount, setShowCount] = useState(0);
  const [actorCount, setActorCount] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    fetch("/api/admin/showmanager", {
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
        console.log("Show Manager API response:", data);
        setShowCount(data.showCount || 0);
        setActorCount(data.actorCount || 0);
      })
      .catch((err) => {
        console.error("Error fetching show summary:", err);
      });
  }, []);

  const isRootPath = location.pathname === "/admin/showmanager";

  return (
    <>
      {isRootPath && (
        <div className="flex flex-col items-center justify-center h-full space-y-10 py-10">
          <div className="flex flex-row justify-center items-center gap-20 text-center">
            <div>
              <h2 className="text-2xl font-semibold text-gray-700">총 공연 수</h2>
              <p className="text-5xl font-bold text-purple-600 mt-2">{showCount}</p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-700">총 배우 수</h2>
              <p className="text-5xl font-bold text-green-600 mt-2">{actorCount}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ShowMainComponent;
