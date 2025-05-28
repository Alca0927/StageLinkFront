import { useParams } from "react-router-dom"
import StatComponent from "../../components/StatisticsManger/registerStat";

const RegisterStatPage = () => {
    const {year, month} = useParams()

    return (
        <div className="p-4 w-full bg-white">
            <div>RegisterStat Page</div>
            <StatComponent year = {year} month = {month}></StatComponent>
        </div>
    );
}

export default RegisterStatPage;