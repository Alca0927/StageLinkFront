import { useParams } from "react-router-dom"
import SalesStatComponent from "../../components/StatisticsManger/salesStat";

// 매출 통계 페이지
const SalesStatPage = () => {
    const {year, month} = useParams()

    return (
        <div className="p-4 w-full bg-white">
            <div className="mb-4">
                <h1 className="text-2xl font-bold text-gray-900">매출 통계</h1>
                <p className="text-gray-600">월별 매출 현황을 확인할 수 있습니다.</p>
            </div>
            <SalesStatComponent year={year} month={month} />
        </div>
    );
}

export default SalesStatPage;