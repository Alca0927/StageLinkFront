import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ReportDetailPage = () => {
  const { reportNo } = useParams();
  const [report, setReport] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReportDetail = async () => {
      try {
        const response = await axios.get(`/api/reports/${reportNo}`);
        setReport(response.data);
        setError(null);
      } catch (err) {
        console.error('신고 상세 조회 실패:', err);
        if (err.response && err.response.status === 404) {
          setError('유효하지 않은 신고 번호입니다.');
        } else {
          setError('신고 정보를 불러오는 데 실패했습니다.');
        }
        setReport(null);
      }
    };

    if (reportNo) {
      fetchReportDetail();
    } else {
      setError('유효하지 않은 신고 번호입니다.');
    }
  }, [reportNo]);

  const handlePrint = () => {
    window.print();
  };

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  if (!report) {
    return <div className="p-4">신고 정보를 불러오는 중...</div>;
  }

  return (
    <div className="flex max-w-6xl mx-auto mt-8">
      {/* 본문 */}
      <div className="w-3/4 pr-8">
        <h2 className="text-2xl font-bold mb-6">신고 상세 정보</h2>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div><strong>신고 번호:</strong> {report.reportNo}</div>
          <div><strong>게시글 번호:</strong> {report.postNo}</div>
          <div><strong>신고자 ID:</strong> {report.reporterId}</div>
          <div><strong>피신고자 ID:</strong> {report.suspectId}</div>
          <div><strong>신고일자:</strong> {report.reportDate}</div>
          <div className="col-span-2"><strong>신고 사유:</strong> {report.reportReason}</div>
        </div>

        <div className="flex space-x-4">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            뒤로가기
          </button>
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            출력
          </button>
        </div>
      </div>

      {/* 사이드바 */}
      <div className="w-1/4 border-l pl-6">
        <h3 className="text-lg font-semibold mb-4">관리 메뉴</h3>
        <button
          onClick={() => navigate('/admin/membermanager')}
          className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          회원 관리
        </button>
      </div>
    </div>
  );
};

export default ReportDetailPage;
