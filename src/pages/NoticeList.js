import React, { useEffect, useState } from 'react';
import axios from 'axios';

const NoticeList = () => {
    const [notices, setNotices] = useState([]);
    const [editNotice, setEditNotice] = useState(null);
    const [editContent, setEditContent] = useState('');

    useEffect(() => {
        fetchNotices();
    }, []);

    const fetchNotices = () => {
        axios.get('/api/notices').then(res => setNotices(res.data));
    };

    const handleDelete = (id) => {
        if (window.confirm('정말 삭제하시겠습니까?')) {
        axios.delete(`/api/notices/${id}`).then(fetchNotices);
        }
    };

    const handleEdit = (notice) => {
        setEditNotice(notice.noticeNo);
        setEditContent(notice.noticeContents);
    };

    const submitEdit = () => {
        axios.put(`/api/notices/${editNotice}`, {
        noticeContents: editContent,
        noticeDate: new Date().toISOString()
        }).then(() => {
        setEditNotice(null);
        fetchNotices();
        });
    };

    return (
        <div className="max-w-3xl mx-auto p-6">
        <h2 className="text-xl font-bold mb-4">📢 공지사항 목록</h2>
        {notices.map(notice => (
            <div key={notice.noticeNo} className="border p-4 mb-4 rounded bg-white shadow">
            {editNotice === notice.noticeNo ? (
                <>
                <textarea
                    value={editContent}
                    onChange={e => setEditContent(e.target.value)}
                    className="w-full p-2 border rounded"
                />
                <div className="mt-2 flex gap-2">
                    <button onClick={submitEdit} className="px-3 py-1 bg-green-500 text-white rounded">수정완료</button>
                    <button onClick={() => setEditNotice(null)} className="px-3 py-1 bg-gray-400 text-white rounded">취소</button>
                </div>
                </>
            ) : (
                <>
                <p className="whitespace-pre-line">{notice.noticeContents}</p>
                <p className="text-sm text-gray-500 mt-1">작성일: {new Date(notice.noticeDate).toLocaleDateString()}</p>
                <div className="mt-2 flex gap-2">
                    <button onClick={() => handleEdit(notice)} className="px-3 py-1 bg-blue-500 text-white rounded">수정</button>
                    <button onClick={() => handleDelete(notice.noticeNo)} className="px-3 py-1 bg-red-500 text-white rounded">삭제</button>
                </div>
                </>
            )}
            </div>
        ))}
        </div>
    );
};

export default NoticeList;