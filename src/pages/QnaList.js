import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const QnaList = () => {
    const [qnaList, setQnaList] = useState([]);

    useEffect(() => {
        axios.get('/api/qna')
        .then(res => setQnaList(res.data));
    }, []);

    return (
        <div className="p-4 max-w-4xl mx-auto">
        <h1 className="text-xl font-bold mb-4">Q&A 목록</h1>
        <table className="table-auto w-full border">
            <thead>
            <tr className="bg-gray-100">
                <th className="border px-2 py-1">질문번호</th>
                <th className="border px-2 py-1">질문 내용</th>
                <th className="border px-2 py-1">답변 여부</th>
                <th className="border px-2 py-1">작성일</th>
            </tr>
            </thead>
            <tbody>
            {qnaList.map(q => (
                <tr key={q.questionNo} className="hover:bg-gray-50">
                <td className="border px-2 py-1 text-center">{q.questionNo}</td>
                <td className="border px-2 py-1">
                    <Link to={`/qna/${q.questionNo}`} className="text-blue-600 underline">
                    {q.questionContents}
                    </Link>
                </td>
                <td className="border px-2 py-1 text-center">
                    {q.answerContents ? '✅ 완료' : '❌ 미완료'}
                </td>
                <td className="border px-2 py-1 text-center">
                    {q.createDate?.substring(0, 10)}
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
};

export default QnaList;