import { useParams } from "react-router-dom"
import MemberStat from "../../components/StatisticsManger/memberStat";

const MemberStatPage = () => {
    const {year, month} = useParams()

    return (
        <div className="p-4 w-full bg-white">
            <div>memberStat Page</div>
            <MemberStat year = {year} month = {month}></MemberStat>
        </div>
    );
}

export default MemberStatPage;