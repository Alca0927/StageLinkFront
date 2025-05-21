import { Suspense, lazy } from "react";

const Loading = <div>Loading...</div>
// member List
const MemberList = lazy(() => import("../pages/membermanager/members/MemberList"))
const ReportList = lazy(() => import("../pages/membermanager/reports/ReportList"))
// member detail
const MemberDetail = lazy(() => import("../pages/membermanager/members/MemberDetailPage"))
const ReportDetail = lazy(() => import("../pages/membermanager/reports/ReportDetailPage"))

const membermanagerRoutor = () => {
    return[
        {
            path: "members/list",
            element : <Suspense fallback={Loading}><MemberList/></Suspense>
        },
        {
            path: "reports/list",
            element : <Suspense fallback={Loading}><ReportList/></Suspense>
        },
        {
            path: "members/:member_no",
            element : <Suspense fallback={Loading}><MemberDetail/></Suspense>
        },
        {
            path: "reports/:reportNo",
            element : <Suspense fallback={Loading}><ReportDetail/></Suspense>
        }
    ]
}

export default membermanagerRoutor;