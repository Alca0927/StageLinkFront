import { useParams } from "react-router-dom"
import MemberStat from "../../components/StatisticsManger/memberStat";

// 회원 통계 페이지
const MemberStatPage = () => {
    const {year, month} = useParams()

    return (
        <div className="p-4 w-full bg-white">
            <div className="text-3xl font-extrabold"> 회원 통계 페이지</div>
            <MemberStat year = {year} month = {month} />
        </div>
    );
}

export default MemberStatPage;