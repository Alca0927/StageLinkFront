import React, { useState } from 'react';
import axios from 'axios';

const NoticeCreate = () => {
    const [contents, setContents] = useState('');

    const handleSubmit = () => {
        axios.post('/api/notices', {
        noticeContents: contents,
        noticeDate: new Date().toISOString()
        }).then(() => {
        alert('공지 등록 완료');
        setContents('');
        });
    };

    return (
        <div className="max-w-3xl mx-auto p-6">
        <h2 className="text-xl font-bold mb-4">공지사항 등록</h2>
        <textarea
            value={contents}
            onChange={(e) => setContents(e.target.value)}
            className="w-full p-3 border rounded h-40"
            placeholder="공지 내용을 입력하세요"
        />
        <button
            onClick={handleSubmit}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
        >
            등록
        </button>
        </div>
    );
};

export default NoticeCreate;