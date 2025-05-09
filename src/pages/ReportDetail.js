import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ReportDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [report, setReport] = useState(null);

    useEffect(() => {
        axios.get(`/api/reports/${id}`).then(res => setReport(res.data));
    }, [id]);

    const handlePrint = () => {
        window.print();
    };

    if (!report) return <div className="p-4">불러오는 중...</div>;

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded">
        <h2 className="text-xl font-bold mb-6">📄 신고 상세 정보</h2>

        <div className="space-y-2 mb-6">
            <p><strong>신고번호:</strong> {report.reportNo}</p>
            <p><strong>신고자 ID:</strong> {report.reporterMember?.mbrId}</p>
            <p><strong>게시글 번호:</strong> {report.postNo}</p>
            <p><strong>신고 사유:</strong> {report.reportReason}</p>
        </div>

        <div className="mb-6">
            <h3 className="font-semibold mb-2">📝 신고 상세 내용</h3>
            <div className="bg-gray-100 p-3 rounded whitespace-pre-line">{report.reportContent}</div>
        </div>

        {report.post && (
        <div className="mb-6 border-t pt-6">
            <h3 className="font-semibold mb-3">📢 신고된 게시글 내용</h3>
            <div className="bg-gray-50 p-4 border rounded space-y-2">
            <p><strong>제목:</strong> {report.post.title}</p>
            <p><strong>작성자:</strong> {report.post.author}</p>
            <p><strong>작성일:</strong> {new Date(report.post.createdAt).toLocaleString()}</p>
            <div className="mt-3">
                <p className="font-semibold mb-1">내용:</p>
                <p className="whitespace-pre-line">{report.post.content}</p>
            </div>
            </div>
        </div>
    )}

        <div className="flex justify-end gap-4 mt-6 print:hidden">
            <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
            ← 뒤로가기
            </button>
            <button
            onClick={handlePrint}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
            출력
            </button>
        </div>
        </div>
    );
};

export default ReportDetail;