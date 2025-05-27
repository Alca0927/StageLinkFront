import { useParams } from "react-router-dom"
import StatComponent from "../../components/StatisticsManger/salesStat";

const RegisterStatPage = () => {
    const {showNo} = useParams()

    return (
        <div className="p-4 w-full bg-white">
            <div>RegisterStat Page</div>
            <StatComponent year = {showNo}></StatComponent>
        </div>
    );
}

export default RegisterStatPage;