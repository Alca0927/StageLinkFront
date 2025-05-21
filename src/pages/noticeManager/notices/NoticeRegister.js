import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NoticeRegister = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const notice = {
      noticeTitle: title,
      noticeContent: content,
      noticeDate: new Date().toISOString().split('T')[0]
    };

    fetch('/api/notices', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(notice)
    })
      .then(response => {
        if (response.ok) {
          alert('공지사항이 등록되었습니다.');
          navigate('/admin/noticemanager/notices/list'); // ✅ 목록 페이지로 이동
        } else {
          return response.text().then(text => {
            throw new Error(text || '등록에 실패했습니다.');
          });
        }
      })
      .catch(err => {
        console.error('등록 오류:', err);
        alert('공지사항 등록 중 오류가 발생했습니다.');
      });
  };

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h2 className="text-xl font-bold mb-4">공지사항 등록</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold">제목:</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block font-semibold">내용:</label>
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded"
            rows={6}
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          등록
        </button>
      </form>
    </div>
  );
};

export default NoticeRegister;
