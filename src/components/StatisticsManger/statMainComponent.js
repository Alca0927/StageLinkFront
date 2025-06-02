import { useEffect, useState } from "react";
import { getMemberStat, getSalesStat } from '../../api/StatApi';

const StatMainComponent = () => {

    // 현재 년월 상태
    const now = new Date();
    const year = now.getFullYear(); // 현재 연도 (예: 2025)
    const month = now.getMonth() + 1; // 현재 월 (0부터 시작하므로 +1 필요, 예: 5월이면 5)

    // 현재 회원 수
    const [CurrentCount, setCurrentCount] = useState(null);
    // 총 매출
    const [Sales, setSales] = useState(null);

    const fetchStatData = async () => {
        try {
            // 총 회원 수
            let current = null;
            try{
                current = await getMemberStat(year, month);
                setCurrentCount(current);
            } catch (error) {
                console.log(" 현재 총 회원수 오류 : ", error)
            }

            // 총 매출
            let sales = null;
            try {
                sales = await getSalesStat(year, month);
                setSales(sales);
            } catch (error) {
                console.log(" 현재 매출 오류 : ", error)
            }
        } catch (error) {
            console.log("총체적 난국", error)
        }
    }


    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (!token) return; 
        fetchStatData();
    }, [])


    return(
        <div className="flex flex-col items-center justify-center h-full space-y-10 py-10">
            <h2>{year}년 {month}월 통계 요약</h2>
          <div className="flex flex-row justify-center items-center gap-20 text-center">
            <div>
              <h2 className="text-2xl font-semibold text-gray-700">총 회원 수</h2>
              <p className="text-5xl font-bold text-blue-600 mt-2">{CurrentCount?.memberSum.toLocaleString() || 0}명</p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-700">총 매출</h2>
              <p className="text-5xl font-bold text-green-500 mt-2">{Sales?.salesSum.toLocaleString() || 0}원</p>
            </div>
          </div>
        </div>
    );
};

export default StatMainComponent;