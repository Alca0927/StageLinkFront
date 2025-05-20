import React, { useState } from 'react';

const QnaEntry = () => {
    const [questionNo, setQuestionNo] = useState('');
    const [answerContents, setAnswerContents] = useState('');
    const [qnaRating, setQnaRating] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();
        const qna = {
        questionNo: parseInt(questionNo),
        answerContents,
        qnaRating: parseInt(qnaRating)
        };
        fetch(`/api/qna/${questionNo}/answer`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(qna)
        })
        .then(() => alert('답변이 등록되었습니다.'));
    };

    return (
        <div>
        <h2>Q&A 답변 입력</h2>
        <form onSubmit={handleSubmit}>
            <div>
            <label>Q&A 번호:</label>
            <input type="number" value={questionNo} onChange={e => setQuestionNo(e.target.value)} required />
            </div>
            <div>
            <label>답변 내용:</label>
            <textarea value={answerContents} onChange={e => setAnswerContents(e.target.value)} required />
            </div>
            <div>
            <label>평점:</label>
            <input type="number" value={qnaRating} onChange={e => setQnaRating(e.target.value)} required />
            </div>
            <button type="submit">등록</button>
        </form>
        </div>
    );
};

export default QnaEntry;
