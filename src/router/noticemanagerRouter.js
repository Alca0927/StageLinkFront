import { Suspense, lazy } from "react";
import NoticeRegister from "../pages/noticeManager/notices/NoticeRegister";
import NoticeDetail from "../pages/noticeManager/notices/NoticeDetail";


const Loading = <div>Loading...</div>
// Notice / Q&A List
const NoticeList = lazy(() => import("../pages/noticeManager/notices/NoticeList"))
const QnaList = lazy(() => import("../pages/noticeManager/qnas/QnaList"))
// Notice / Q&A detail
const QnaEntry = lazy(() => import("../pages/noticeManager/qnas/QnaEntry"))

const noticemanagerRoutor = () => {
    return[
        {
            path: "notices/list",
            element : <Suspense fallback={Loading}><NoticeList/></Suspense>
        },
        {
            path: "notices/:noticeNo",
            element : <Suspense fallback={Loading}><NoticeDetail/></Suspense>
        },
        {
            path: "notices/register",
            element : <Suspense fallback={Loading}><NoticeRegister/></Suspense>
        },
        {
            path: "Q&A/list",
            element : <Suspense fallback={Loading}><QnaList/></Suspense>
        },
        
        {
            path: "qna/:questionNo",
            element : <Suspense fallback={Loading}><QnaEntry/></Suspense>
        }
        
    ]
}

export default noticemanagerRoutor;