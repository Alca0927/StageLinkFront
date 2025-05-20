import { Suspense, lazy } from "react";


const Loading = <div>Loading...</div>
// Notice / Q&A List
const NoticeList = lazy(() => import("../pages/noticeManager/notices/NoticeList"))
const QnaList = lazy(() => import("../pages/noticeManager/qnas/QnaList"))
// Notice / Q&A detail
const NoticeCreate = lazy(() => import("../pages/noticeManager/notices/NoticeCreate"))
const QnaEntry = lazy(() => import("../pages/noticeManager/qnas/QnaEntry"))

const noticemanagerRoutor = () => {
    return[
        {
            path: "notices/list",
            element : <Suspense fallback={Loading}><NoticeList/></Suspense>
        },
        {
            path: "noticelist/:notice_no",
            element : <Suspense fallback={Loading}><NoticeCreate/></Suspense>
        },
        {
            path: "Q&A/list",
            element : <Suspense fallback={Loading}><QnaList/></Suspense>
        },
        
        {
            path: "Qnalist/:qna_no",
            element : <Suspense fallback={Loading}><QnaEntry/></Suspense>
        }
        
    ]
}

export default noticemanagerRoutor;