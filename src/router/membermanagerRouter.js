import { Suspense, lazy } from "react";

const Loading = <div>Loading...</div>
// member List
const MemberList = lazy(() => import("../pages/members/MemberList"))
const ReportList = lazy(() => import("../pages/reports/ReportList"))
// member detail
const MemberDetail = lazy(() => import("../pages/members/MemberDetailPage"))
const ReportDetail = lazy(() => import("../pages/reports/ReportDetailPage"))

const membermanagerRoutor = () => {
    return[
        {
            path: "memberlist",
            element : <Suspense fallback={Loading}><MemberList/></Suspense>
        },
        {
            path: "reportlist",
            element : <Suspense fallback={Loading}><ReportList/></Suspense>
        },
        {
            path: "memberlist/:member_no",
            element : <Suspense fallback={Loading}><MemberDetail/></Suspense>
        },
        {
            path: "reportlist/:report_no",
            element : <Suspense fallback={Loading}><ReportDetail/></Suspense>
        }
    ]
}

export default membermanagerRoutor;