import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const QnaEntry = () => {
  const { questionNo } = useParams();
  const [questionContents, setQuestionContents] = useState('');
  const [answerContents, setAnswerContents] = useState('');
  const [qnaRating, setQnaRating] = useState(0);
  const [loading, setLoading] = useState(true);

  // 질문 + 기존 답변 내용 불러오기
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const url = `http://localhost:8080/api/qna/${questionNo}`;
    console.log("📡 요청 URL:", url);

    fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        console.log("📥 응답 상태 코드:", res.status);
        if (!res.ok) throw new Error("질문 불러오기 실패");
        return res.json();
      })
      .then(data => {
        console.log("✅ 받은 데이터:", data);
        setQuestionContents(data.questionContents || '');
        setAnswerContents(data.answerContents || '');
        setQnaRating(data.qnaRating || 0);
        setLoading(false);
      })
      .catch(err => {
        console.error("❌ 질문 조회 오류:", err);
        setQuestionContents('(질문 내용을 불러오지 못했습니다)');
        setLoading(false);
      });
  }, [questionNo]);

  // 답변 등록
  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");

    const qna = {
      questionNo: parseInt(questionNo),
      answerContents,
      qnaRating: parseInt(qnaRating)
    };

    fetch(`http://localhost:8080/api/qna/${questionNo}/answer`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(qna)
    })
      .then(res => {
        if (!res.ok) throw new Error("등록 실패");
        alert('답변이 등록되었습니다.');
      })
      .catch(err => {
        console.error("❌ 등록 오류:", err);
        alert('답변 등록 중 오류가 발생했습니다.');
      });
  };

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h2 className="text-xl font-bold mb-4">Q&A 답변 입력</h2>
      {loading ? (
        <p className="text-gray-600">질문을 불러오는 중...</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold">질문:</label>
            <div className="p-3 border rounded bg-gray-100 whitespace-pre-line">
              {questionContents}
            </div>
          </div>
          <div>
            <label className="block font-semibold">답변 내용:</label>
            <textarea
              value={answerContents}
              onChange={e => setAnswerContents(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded"
              rows={5}
            />
          </div>
          <div>
            <label className="block font-semibold">평점 (1~5):</label>
            <input
              type="number"
              min="1"
              max="5"
              value={qnaRating}
              onChange={e => setQnaRating(Number(e.target.value))}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            등록
          </button>
        </form>
      )}
    </div>
  );
};

export default QnaEntry;
