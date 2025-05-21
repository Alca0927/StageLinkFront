import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const NoticeDetail = () => {
  const { noticeNo } = useParams();
  const [notice, setNotice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!noticeNo) {
      setError('유효하지 않은 공지사항 번호입니다.');
      setLoading(false);
      return;
    }

    const fetchNotice = async () => {
      try {
        const res = await fetch(`/api/notices/${noticeNo}`);
        if (!res.ok) {
          const text = await res.text();
          console.error("❌ 서버 응답 오류:", text);
          throw new Error('공지사항을 불러올 수 없습니다');
        }
        const data = await res.json();
        setNotice(data);
      } catch (err) {
        console.error('❌ 공지사항 상세 조회 실패:', err);
        setError('공지사항을 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchNotice();
  }, [noticeNo]);

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
      >
        ← 목록으로
      </button>

      {loading ? (
        <p className="text-gray-600">불러오는 중...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        notice && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">{notice.noticeTitle}</h2>
            <p className="text-sm text-gray-500">
              작성일: {new Date(notice.noticeDate).toLocaleString('ko-KR')}
            </p>
            <div className="p-4 border rounded bg-white whitespace-pre-wrap">
              {notice.noticeContent}
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default NoticeDetail;
