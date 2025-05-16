import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const NoticeList = () => {
    const [notices, setNotices] = useState([]);

    useEffect(() => {
        fetch('/api/notices')
        .then(res => res.json())
        .then(data => setNotices(data));
    }, []);

    return (
        <div>
        <h2>공지사항 목록</h2>
        <table>
            <thead>
            <tr>
                <th>공지번호</th>
                <th>제목</th>
                <th>작성일</th>
            </tr>
            </thead>
            <tbody>
            {notices.map(notice => (
                <tr key={notice.notice_no}>
                <td>{notice.notice_no}</td>
                <td><Link to={`/notice/${notice.notice_no}`}>{notice.noticeTitle}</Link></td>
                <td>{notice.notice_date}</td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
};

export default NoticeList;
