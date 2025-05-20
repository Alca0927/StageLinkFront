import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ReportList = () => {
  const [reports, setReports] = useState([]);
  const [searchReason, setSearchReason] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchReports = async () => {
    try {
      const response = await axios.get('/api/reports', {
        params: {
          reason: searchReason,
          page: currentPage,
        },
      });
      setReports(response.data.content || []);
      setTotalPages(response.data.totalPages || 1);
      setError(null);
    } catch (err) {
      console.error('불법 신고 목록 조회 실패:', err);
      setReports([]);
      setError('서버와의 연결에 문제가 있습니다.');
    }
  };

  useEffect(() => {
    fetchReports();
  }, [currentPage]); // 검색어 변경 시에는 실행되지 않도록 변경

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
        <button onClick={handleSearch} className="ml-2 px-4 py-2 bg-blue-500 text-white rounded">
          검색
        </button>
      </div>

      <table className="w-full table-fixed border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="w-1/12 px-4 py-2 border">신고 번호</th>
            <th className="w-2/12 px-4 py-2 border">신고자 ID</th>
            <th className="w-1/12 px-4 py-2 border">게시글 번호</th>
            <th className="w-8/12 px-4 py-2 border">신고 사유</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {error ? (
            <tr>
              <td colSpan="4" className="text-center text-red-500 py-4">
                ⚠ {error}
              </td>
            </tr>
          ) : reports.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center text-gray-500 py-4">
                🔍 검색 결과가 없습니다.
              </td>
            </tr>
          ) : (
            reports.map((report) => (
              <tr
                key={report.reportNo}
                className="border-t cursor-pointer hover:bg-gray-50"
                onClick={() => navigate(`/admin/membermanager/reports/${report.reportNo}`)}
              >
                <td className="px-4 py-2 border text-center">{report.reportNo}</td>
                <td className="px-4 py-2 border text-center">{report.reporterId}</td>
                <td className="px-4 py-2 border text-center">{report.postNo}</td>
                <td className="px-4 py-2 border break-words">{report.reportReason}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="mt-4 flex justify-center space-x-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`px-3 py-1 border rounded ${
              currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
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
