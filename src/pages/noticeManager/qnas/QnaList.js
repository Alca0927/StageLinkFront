import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const QnaList = () => {
  const [qnas, setQnas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;

  const navigate = useNavigate();

  const fetchQnas = async (pageNum = 1) => {
    setLoading(true);
    const token = localStorage.getItem("accessToken"); // ✅ JWT 토큰 가져오기

    try {
      const res = await fetch(`/api/qna/list?page=${pageNum}&size=${pageSize}`, {
        headers: {
          Authorization: `Bearer ${token}` // ✅ 인증 헤더 추가
        }
      });
      if (!res.ok) throw new Error('서버 오류');
      const data = await res.json();
      setQnas(Array.isArray(data.dtoList) ? data.dtoList : []);
      setTotalPages(typeof data.totalPage === 'number' ? data.totalPage : 1);
    } catch (err) {
      console.error('Q&A 불러오기 실패:', err);
      setError('Q&A 데이터를 불러오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQnas(page);
  }, [page]);

  return (
    <div className="max-w-7xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Q&A 목록</h2>

      <table className="w-full table-fixed border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="w-1/12 px-2 py-2 border">Q&A 번호</th>
            <th className="w-1/12 px-2 py-2 border">회원 번호</th>
            <th className="w-3/12 px-2 py-2 border">질문</th>
            <th className="w-3/12 px-2 py-2 border">답변</th>
            <th className="w-2/12 px-2 py-2 border">작성일</th>
            <th className="w-2/12 px-2 py-2 border">평점</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {loading ? (
            <tr>
              <td colSpan="6" className="text-center p-4">로딩 중...</td>
            </tr>
          ) : error ? (
            <tr>
              <td colSpan="6" className="text-center p-4 text-red-500">{error}</td>
            </tr>
          ) : qnas.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center p-4">Q&A 데이터가 없습니다.</td>
            </tr>
          ) : (
            qnas.map(qna => (
              <tr
                key={qna.questionNo}
                className="border-t cursor-pointer hover:bg-gray-100"
                onClick={() => navigate(`/admin/noticemanager/qna/entry/${qna.questionNo}`)}
              >
                <td className="px-2 py-2 border text-center">{qna.questionNo}</td>
                <td className="px-2 py-2 border text-center">{qna.memberNo}</td>
                <td className="px-2 py-2 border break-words">{qna.questionContents}</td>
                <td className="px-2 py-2 border break-words">{qna.answerContents}</td>
                <td className="px-2 py-2 border text-center">{new Date(qna.createDate).toLocaleDateString('ko-KR')}</td>
                <td className="px-2 py-2 border text-center">{qna.qnaRating}</td>
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

export default QnaList;
