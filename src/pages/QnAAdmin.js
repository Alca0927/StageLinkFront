import React, { useEffect, useState } from 'react';
import axios from 'axios';

const QnAAdmin = () => {
    const [qnaList, setQnaList] = useState([]);
    const [answers, setAnswers] = useState({});

    useEffect(() => {
        axios.get('/api/qna').then(res => setQnaList(res.data));
    }, []);

    const handleChange = (id, value) => {
        setAnswers({ ...answers, [id]: value });
    };

    const handleSubmit = (id) => {
        axios.put(`/api/qna/${id}/answer`, answers[id])
        .then(() => alert('답변 완료'))
        .catch(() => alert('오류 발생'));
    };
    
    return (
        <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-xl font-bold mb-4">Q&A 질문 목록</h2>
        {qnaList.map(q => (
            <div key={q.questionNo} className="border rounded p-4 mb-4 bg-white shadow">
            <p><strong>회원번호:</strong> {q.memberNo}</p>
            <p><strong>질문내용:</strong> {q.questionContents}</p>
            <p><strong>작성일:</strong> {new Date(q.createDate).toLocaleString()}</p>
            <textarea
                placeholder="답변을 입력하세요"
                value={answers[q.questionNo] || q.answerContents || ''}
                onChange={e => handleChange(q.questionNo, e.target.value)}
                className="w-full mt-2 p-2 border rounded"
            />
            <button
                onClick={() => handleSubmit(q.questionNo)}
                className="mt-2 px-4 py-1 bg-blue-600 text-white rounded"
            >
                답변 등록
            </button>
            </div>
        ))}
        </div>
    );
};

export default QnAAdmin;