import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ReportList = () => {
    const [reports, setReports] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('/api/reports', { params: { page, size: 10 } })
        .then(res => {
            setReports(res.data.content);
            setTotalPages(res.data.totalPages);
        });
    }, [page]);

    return (
        <div className="max-w-6xl mx-auto p-4">
        <h2 className="text-xl font-bold mb-4">신고 목록</h2>
        <table className="w-full border text-sm">
            <thead className="bg-gray-100">
            <tr>
                <th className="border px-2 py-1">신고번호</th>
                <th className="border px-2 py-1">신고자</th>
                <th className="border px-2 py-1">게시글번호</th>
                <th className="border px-2 py-1">신고사유</th>
            </tr>
            </thead>
            <tbody>
            {reports.map(report => (
                <tr key={report.reportNo} className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => navigate(`/reports/${report.reportNo}`)}>
                <td className="border px-2 py-1 text-center">{report.reportNo}</td>
                <td className="border px-2 py-1 text-center">{report.reporterId}</td>
                <td className="border px-2 py-1 text-center">{report.postNo}</td>
                <td className="border px-2 py-1">{report.reportReason}</td>
                </tr>
            ))}
            </tbody>
        </table>

        <div className="flex justify-center gap-2 mt-4">
            <button onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0}
                    className="px-3 py-1 bg-blue-500 text-white rounded disabled:bg-gray-300">이전</button>
            <span>페이지 {page + 1} / {totalPages}</span>
            <button onClick={() => setPage(p => p + 1)} disabled={page + 1 >= totalPages}
                    className="px-3 py-1 bg-blue-500 text-white rounded disabled:bg-gray-300">다음</button>
        </div>
        </div>
    );
};

export default ReportList;