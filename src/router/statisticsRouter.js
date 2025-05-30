import { Suspense, lazy } from "react";

const Loading = <div>Loading...</div>

const MemberStat = lazy(() => import("../pages/statisticsManager/MemberStatPage"))
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
        }
    ]
}

export default statisticsRouter;