import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MemberList from './MemberList';
import MemberDetailPage from './MemberDetailPage';
import ReportList from './ReportList';
import ReportDetail from './ReportDetail';
import QnaList from './QnaList';
import QnaDetail from './QnaDetail';
import NoticeCreate from './NoticeCreate';
import NoticeList from './NoticeList';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-blue-600 text-white p-4">
          <h1 className="text-xl font-semibold">회원 관리 시스템</h1>
        </header>
        <main className="p-6">
          <Routes>
            <Route path="/" element={<MemberList />} />
            <Route path="/members/:id" element={<MemberDetailPage />} />
            <Route path="/reports" element={<ReportList />} />
            <Route path="/reports/:id" element={<ReportDetail />} />
            <Route path="/qna" element={<QnaList />} />
            <Route path="/qna/:id" element={<QnaDetail />} />
            <Route path="/admin/notices/create" element={<NoticeCreate />} />
            <Route path="/admin/notices" element={<NoticeList />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
