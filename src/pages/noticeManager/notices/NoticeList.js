import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NoticeList = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;

  const navigate = useNavigate();

  const fetchNotices = async (pageNum) => {
    setLoading(true);
    const token = localStorage.getItem("accessToken"); // ✅ JWT 토큰 가져오기

    try {
      const res = await fetch(`/api/notices/list?page=${pageNum}&size=${pageSize}`, {
        headers: {
          Authorization: `Bearer ${token}` // ✅ 인증 헤더 추가
        }
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("📨 에러 응답 내용:", text);
        throw new Error("서버 오류");
      }

      const data = await res.json();
      setNotices(Array.isArray(data.dtoList) ? data.dtoList : []);
      setTotalPages(typeof data.totalPage === 'number' ? data.totalPage : 1);
    } catch (err) {
      console.error("❌ 공지사항 불러오기 실패:", err);
      setError("공지사항을 불러오는 중 오류가 발생했습니다.");
    } finally {
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
              <tr
                key={notice.noticeNo}
                className="border-t cursor-pointer hover:bg-gray-100"
                onClick={() => navigate(`/admin/noticemanager/notices/${notice.noticeNo}`)}
              >
                <td className="px-4 py-2 border text-center">{notice.noticeNo}</td>
                <td className="px-4 py-2 border break-words">{notice.noticeTitle}</td>
                <td className="px-4 py-2 border text-center">
                  {new Date(notice.noticeDate).toLocaleDateString('ko-KR')}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="flex justify-center mt-4 space-x-2">
        {Array.from({ length: totalPages }, (_, idx) => (
          <button
            key={idx + 1}
            onClick={() => setPage(idx + 1)}
            className={`px-3 py-1 rounded font-bold ${
              page === idx + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
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
