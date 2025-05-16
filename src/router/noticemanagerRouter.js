import { Suspense, lazy } from "react";

const Loading = <div>Loading...</div>
// Notice / Q&A List
const NoticeList = lazy(() => import("../pages/notices/NoticeList"))
const QnaList = lazy(() => import("../pages/qnas/QnaList"))
// Notice / Q&A detail
const NoticeCreate = lazy(() => import("../pages/notices/NoticeCreate"))
const QnaDetail = lazy(() => import("../pages/qnas/QnaEntry"))

const noticemanagerRoutor = () => {
    return[
        {
            path: "noticelist",
            element : <Suspense fallback={Loading}><NoticeList/></Suspense>
        },
        {
            path: "Qnalist",
            element : <Suspense fallback={Loading}><QnaList/></Suspense>
        },
        {
            path: "noticelist/:notice_no",
            element : <Suspense fallback={Loading}><NoticeCreate/></Suspense>
        },
        {
            path: "Qnalist/:qna_no",
            element : <Suspense fallback={Loading}><QnaDetail/></Suspense>
        }
    ]
}

export default noticemanagerRoutor;