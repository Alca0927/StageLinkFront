import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NoticeCreate = () => {
    const [title, setTitle] = useState('');
    const [contents, setContents] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const notice = {
        noticeTitle: title,
        notice_contents: contents,
        notice_date: new Date().toISOString().split('T')[0]
        };
        fetch('/api/notices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(notice)
        })
        .then(() => navigate('/notice/list'));
    };

    return (
        <div>
        <h2>공지사항 등록</h2>
        <form onSubmit={handleSubmit}>
            <div>
            <label>제목:</label>
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} required />
            </div>
            <div>
            <label>내용:</label>
            <textarea value={contents} onChange={e => setContents(e.target.value)} required />
            </div>
            <button type="submit">등록</button>
        </form>
        </div>
    );
};

export default NoticeCreate;
