import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const NoticeList = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10; // 한 페이지당 항목 수

  const fetchNotices = async (pageNum) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/notices?page=${pageNum}&size=${pageSize}`);
      if (!res.ok) {
        throw new Error("서버 오류");
      }
      const data = await res.json();
      setNotices(Array.isArray(data.content) ? data.content : []);
      setTotalPages(data.totalPages || 1);
      setLoading(false);
    } catch (err) {
      console.error("공지사항 불러오기 실패:", err);
      setError("공지사항을 불러오는 중 오류가 발생했습니다.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices(page);
  }, [page]);

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">공지사항</h1>

      <table className="w-full table-fixed border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="w-1/12 px-4 py-2 border">번호</th>
            <th className="w-8/12 px-4 py-2 border">제목</th>
            <th className="w-3/12 px-4 py-2 border">작성일</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {loading ? (
            <tr>
              <td colSpan="3" className="text-center p-4">로딩 중...</td>
            </tr>
          ) : error ? (
            <tr>
              <td colSpan="3" className="text-center p-4 text-red-500">{error}</td>
            </tr>
          ) : notices.length === 0 ? (
            <tr>
              <td colSpan="3" className="text-center p-4">공지사항이 없습니다.</td>
            </tr>
          ) : (
            notices.map(notice => (
              <tr key={notice.notice_no} className="border-t">
                <td className="px-4 py-2 border text-center">{notice.notice_no}</td>
                <td className="px-4 py-2 border break-words">
                  <Link to={`/notice/${notice.notice_no}`} className="text-blue-600 hover:underline">
                    {notice.noticeTitle}
                  </Link>
                </td>
                <td className="px-4 py-2 border text-center">{notice.notice_date}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* 페이지네이션 */}
      <div className="flex justify-center mt-4 space-x-2">
        {Array.from({ length: totalPages }, (_, idx) => (
          <button
            key={idx + 1}
            onClick={() => setPage(idx + 1)}
            className={`px-3 py-1 rounded ${
              page === idx + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default NoticeList;
