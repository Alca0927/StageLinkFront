import MemberList from "../pages/members/MemberList";
import MemberDetailPage from "../pages/members/MemberDetailPage";

import ReportList from "../pages/reports/ReportList";
import ReportDetailPage from "../pages/reports/ReportDetailPage";

import NoticeList from "../pages/notices/NoticeList";
import NoticeCreate from "../pages/notices/NoticeCreate";

import QnaList from "../pages/qnas/QnaList";
import QnaEntry from "../pages/qnas/QnaEntry";

function adminRouter() {
    return [
        // 회원 관리
        { path: "members", element: <MemberList /> },
        { path: "members/:memberNo", element: <MemberDetailPage /> },

        // 불법 신고 관리
        { path: "reports", element: <ReportList /> },
        { path: "reports/:reportNo", element: <ReportDetailPage /> },

        // 공지사항
        { path: "notices", element: <NoticeList /> },
        { path: "notices/create", element: <NoticeCreate /> },

        // Q&A
        { path: "qnas", element: <QnaList /> },
        { path: "qnas/entry/:questionNo", element: <QnaEntry /> }
    ];
}

export default adminRouter;