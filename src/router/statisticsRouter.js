import { Suspense, lazy } from "react";

const Loading = <div>Loading...</div>

const MemberStat = lazy(() => import("../pages/statisticsManager/MemberStatPage"))
const RegisterStat = lazy(() => import("../pages/statisticsManager/RegisterStatPage"))
const SalesStat = lazy(() => import("../pages/statisticsManager/SalesStatPage"))


const statisticsRouter = () => {
    return[
        {
            path: "members/:year/:month",
            element : <Suspense fallback={Loading}><MemberStat/></Suspense>
        },
        {
            path: "sales/:year/:month",
            element : <Suspense fallback={Loading}><SalesStat/></Suspense>
        },
        {
            path: "register/:showNo",
            element : <Suspense fallback={Loading}><RegisterStat/></Suspense>
        }
    ]
}

export default statisticsRouter;