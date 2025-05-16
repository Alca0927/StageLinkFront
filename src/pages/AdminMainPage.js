import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const AdminMainPage = () => {
    const [noticeCount, setNoticeCount] = useState(0);
    const [qnaCount, setQnaCount] = useState(0);

    useEffect(() => {
        fetch('/api/notices/count')
        .then(res => res.json())
        .then(data => setNoticeCount(data.count))
        .catch(console.error);

        fetch('/api/qna/count')
        .then(res => res.json())
        .then(data => setQnaCount(data.count))
        .catch(console.error);
    }, []);

    return (
        <div className="max-w-6xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        
        {/* 상단 버튼 */}
        <div className="flex flex-wrap gap-2 mb-6">
            <Link
            to="/admin/members"
            className="text-sm bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
            >
            회원 목록
            </Link>
            <Link
            to="/admin/reports"
            className="text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
            >
            불법 신고 목록
            </Link>
            <Link
            to="/admin/qnas"
            className="text-sm bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
            >
            Q&A 목록
            </Link>
            <Link
            to="/admin/qnas/entry/1"
            className="text-sm bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
            >
            Q&A 답변 입력
            </Link>
            <Link
            to="/admin/notices"
            className="text-sm bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
            >
            공지사항 목록
            </Link>
            <Link
            to="/admin/notices/create"
            className="text-sm bg-green-400 hover:bg-green-500 text-white px-3 py-1 rounded"
            >
            공지사항 등록
            </Link>
        </div>

        {/* 제목 및 데이터 */}
        <h2 className="text-2xl font-bold mb-4">공지사항 및 Q&A 관리</h2>
        <div className="grid grid-cols-2 gap-4">
            <div>
            <strong>공지사항 건수:</strong> {noticeCount}
            </div>
            <div>
            <strong>Q&A 건수:</strong> {qnaCount}
            </div>
        </div>
        </div>
    );
};

export default AdminMainPage;
