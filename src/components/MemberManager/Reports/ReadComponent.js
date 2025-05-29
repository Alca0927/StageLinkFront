import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getReportDetail } from "../../../api/reportApi";
import useCustomMove from "../../../hooks/useCustomMove";

const initState = {
  reportNo: 0,
  postNo: 0,
  reporterId: '',
  suspectId: '',
  reportDate: '',
  reportReason: ''
};

const ReportReadComponent = () => {
  const { reportNo } = useParams();
  const [report, setReport] = useState(initState);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { moveToList } = useCustomMove();

  useEffect(() => {
    if (!reportNo) {
      setError('유효하지 않은 신고 번호입니다.');
      setLoading(false);
      return;
    }

    getReportDetail(reportNo)
      .then((data) => {
        console.log("📋 불법 신고 상세 응답:", data);
        setReport(data);
        setError(null);
      })
      .catch((err) => {
        console.error('❌ 신고 상세 조회 실패:', err);
        if (err.response?.status === 404) {
          setError('유효하지 않은 신고 번호입니다.');
        } else {
          setError('신고 정보를 불러오는 데 실패했습니다.');
        }
        setReport(initState);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [reportNo]);

  const handlePrint = () => {
    window.print();
  };

  const handleClickList = () => {
    moveToList(1, "reports");
  };



  if (loading) {
    return (
      <div className="border-2 border-blue-200 mt-10 mr-2">
        <div className="flex flex-wrap mx-auto p-6">
          <div className="w-full text-center p-8 text-gray-500">
            신고 정보를 불러오는 중...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="border-2 border-blue-200 mt-10 mr-2">
        <div className="flex flex-wrap mx-auto p-6">
          <div className="w-full text-center p-8 text-red-500">
            ⚠ {error}
          </div>
          <div className="w-full text-center">
            <button
              onClick={handleClickList}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              목록으로 돌아가기
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="border-2 border-blue-200 mt-10 mr-2">
      <div className="flex flex-wrap mx-auto p-6">
        
        {/* 제목 */}
        <div className="w-full mb-6">
          <h2 className="text-2xl font-bold text-center">신고 상세 정보</h2>
        </div>

        {/* 상세 정보 */}
        <div className="w-full bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="space-y-4">
              <div className="flex flex-col">
                <label className="font-semibold text-gray-700 mb-1">신고 번호</label>
                <div className="p-3 bg-gray-50 rounded border">
                  {report.reportNo}
                </div>
              </div>
              
              <div className="flex flex-col">
                <label className="font-semibold text-gray-700 mb-1">게시글 번호</label>
                <div className="p-3 bg-gray-50 rounded border">
                  {report.postNo}
                </div>
              </div>
              
              <div className="flex flex-col">
                <label className="font-semibold text-gray-700 mb-1">신고자 ID</label>
                <div className="p-3 bg-gray-50 rounded border">
                  {report.reporterId}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col">
                <label className="font-semibold text-gray-700 mb-1">피신고자 ID</label>
                <div className="p-3 bg-gray-50 rounded border">
                  {report.suspectId}
                </div>
              </div>
              
              <div className="flex flex-col">
                <label className="font-semibold text-gray-700 mb-1">신고일자</label>
                <div className="p-3 bg-gray-50 rounded border">
                  {report.reportDate ? new Date(report.reportDate).toLocaleDateString('ko-KR') : ''}
                </div>
              </div>
            </div>

            <div className="md:col-span-2">
              <div className="flex flex-col">
                <label className="font-semibold text-gray-700 mb-1">신고 사유</label>
                <div className="p-3 bg-gray-50 rounded border min-h-[100px]">
                  {report.reportReason}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 버튼 그룹 */}
        <div className="w-full flex justify-center gap-3">
          <button
            onClick={handleClickList}
            className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
          >
            목록
          </button>
          <button
            onClick={handlePrint}
            className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
          >
            출력
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportReadComponent;