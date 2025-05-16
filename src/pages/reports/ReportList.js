import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ReportList = () => {
    const [reports, setReports] = useState([]);
    const [searchReason, setSearchReason] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const navigate = useNavigate();

    const fetchReports = async () => {
        try {
            const response = await axios.get('/api/reports', {
                params: {
                    reason: searchReason,
                    page: currentPage,
                },
            });
            setReports(response.data.content);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error('불법 신고 목록 조회 실패:', error);
        }
    };

    useEffect(() => {
        fetchReports();
    }, [currentPage, searchReason]);

    const handleSearch = () => {
        setCurrentPage(1);
        fetchReports();
    };

    return (
        <div className="max-w-6xl mx-auto mt-8">
            <h2 className="text-2xl font-bold mb-4">불법 신고 목록</h2>

            <div className="mb-4">
                <input
                    type="text"
                    placeholder="신고 사유로 검색"
                    value={searchReason}
                    onChange={(e) => setSearchReason(e.target.value)}
                    className="border px-3 py-2 rounded w-1/3"
                />
                <button onClick={handleSearch} className="ml-2 px-4 py-2 bg-blue-500 text-white rounded">검색</button>
            </div>

            <table className="w-full table-auto border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="px-4 py-2">신고 번호</th>
                        <th className="px-4 py-2">신고자 ID</th>
                        <th className="px-4 py-2">게시글 번호</th>
                        <th className="px-4 py-2">신고 사유</th>
                    </tr>
                </thead>
                <tbody>
                    {reports.map((report) => (
                        <tr key={report.reportNo} className="border-t">
                            <td className="px-4 py-2 text-blue-600 cursor-pointer"
                                onClick={() => navigate(`/admin/membermanager/reportlist/${report.reportNo}`)}>
                                {report.reportNo}
                            </td>
                            <td className="px-4 py-2">{report.reporterId}</td>
                            <td className="px-4 py-2">{report.postNo}</td>
                            <td className="px-4 py-2">{report.reportReason}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* 페이지네이션 */}
            <div className="mt-4 flex justify-center space-x-2">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        className={`px-3 py-1 border rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : ''}`}
                        onClick={() => setCurrentPage(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ReportList;
