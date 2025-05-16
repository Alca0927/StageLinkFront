import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const QnaList = () => {
    const [qnas, setQnas] = useState([]);

    useEffect(() => {
        fetch('/api/qna')
        .then(res => res.json())
        .then(data => setQnas(data));
    }, []);

    return (
        <div>
        <h2>Q&A 목록</h2>
        <table>
            <thead>
            <tr>
                <th>Q&A 번호</th>
                <th>회원 번호</th>
                <th>질문</th>
                <th>답변</th>
                <th>작성일</th>
                <th>평점</th>
            </tr>
            </thead>
            <tbody>
            {qnas.map(qna => (
                <tr key={qna.questionNo}>
                <td>{qna.questionNo}</td>
                <td>{qna.memberNo}</td>
                <td>{qna.questionContents}</td>
                <td>{qna.answerContents}</td>
                <td>{qna.createDate}</td>
                <td>{qna.qnaRating}</td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
};

export default QnaList;
