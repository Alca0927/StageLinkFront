import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const QnaDetail = () => {
    const { id } = useParams();
    const [qna, setQna] = useState(null);
    const [answer, setAnswer] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`/api/qna/${id}`).then(res => {
        setQna(res.data);
        setAnswer(res.data.answerContents || '');
        });
    }, [id]);

    const handleSubmit = () => {
        axios.put(`/api/qna/${id}/answer`, { answerContents: answer })
        .then(() => {
            alert('답변이 등록되었습니다.');
            navigate('/qna');
        });
    };

    if (!qna) return <div>로딩 중...</div>;

    return (
        <div className="p-4 max-w-3xl mx-auto">
        <h1 className="text-xl font-bold mb-4">질문 상세</h1>

        <div className="border p-4 mb-4 rounded bg-gray-50">
            <p className="font-semibold">질문 내용</p>
            <p>{qna.questionContents}</p>
        </div>

        <div className="mb-4">
            <label className="font-semibold">답변 작성</label>
            <textarea
            className="w-full border rounded p-2 mt-1"
            rows={5}
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            />
        </div>

        <div className="flex justify-end gap-2">
            <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
            답변 저장
            </button>
            <button
            onClick={() => navigate(-1)}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            >
            목록으로
            </button>
        </div>
        </div>
    );
};

export default QnaDetail;