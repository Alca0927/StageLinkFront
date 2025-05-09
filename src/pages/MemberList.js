import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MemberDetailModal from './MemberDetailModal';
import { useNavigate } from 'react-router-dom';

const MemberList = () => {
    const [members, setMembers] = useState([]);
    const [search, setSearch] = useState('');
    const [status, setStatus] = useState('');
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [selectedMember, setSelectedMember] = useState(null);

    const fetchMembers = async () => {
    try {
        const response = await axios.get('/api/members', {
            params: {
            search,
            page,
            size: 10,
            },
        });

        let filtered = response.data.content;
        if (status) {
            filtered = filtered.filter((m) => m.stat === status);
        }

        setMembers(filtered);
        setTotalPages(response.data.totalPages);
        } catch (error) {
        console.error('회원 조회 실패:', error);
        }
    };

    useEffect(() => {
        fetchMembers();
    }, [page, search, status]);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        setPage(0);
    };

    const handleStatusChange = (e) => {
        setStatus(e.target.value);
        setPage(0);
    };

    // 내부에서
    const navigate = useNavigate();

    return (
        <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-2">
            <input
            type="text"
            placeholder="이름으로 검색"
            value={search}
            onChange={handleSearchChange}
            className="border rounded px-3 py-2 w-full sm:w-1/3"
            />
            <select
            value={status}
            onChange={handleStatusChange}
            className="border rounded px-3 py-2 w-full sm:w-1/4"
            >
            <option value="">전체 상태</option>
            <option value="ACTIVE">ACTIVE</option>
            <option value="INACTIVE">INACTIVE</option>
            <option value="BLOCKED">BLOCKED</option>
            </select>
        </div>

        <table className="w-full table-auto border border-gray-300">
            <thead className="bg-gray-100">
            <tr>
                <th className="border px-4 py-2">회원번호</th>
                <th className="border px-4 py-2">회원ID</th>
                <th className="border px-4 py-2">이름</th>
                <th className="border px-4 py-2">이메일</th>
                <th className="border px-4 py-2">상태</th>
            </tr>
            </thead>
            <tbody>
            {members.length === 0 ? (
                <tr>
                <td colSpan="5" className="text-center py-4">회원이 없습니다.</td>
                </tr>
            ) : (
                members.map((member) => (
                <tr
                    key={member.mbrNo}
                    className="hover:bg-gray-100 cursor-pointer"
                    onClick={() => navigate(`/members/${member.mbrNo}`)}
                    >
                    <td className="border px-4 py-2">{member.mbrNo}</td>
                    <td className="border px-4 py-2">{member.mbrId}</td>
                    <td className="border px-4 py-2">{member.mbrName}</td>
                    <td className="border px-4 py-2">{member.email}</td>
                    <td className="border px-4 py-2">{member.stat}</td>
                </tr>
                ))
            )}
            </tbody>
        </table>

        <div className="flex justify-center mt-4 space-x-2">
            <button
            onClick={() => setPage((p) => Math.max(p - 1, 0))}
            disabled={page === 0}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
            >
            이전
            </button>
            <span className="self-center">페이지 {page + 1} / {totalPages}</span>
            <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages - 1))}
            disabled={page + 1 >= totalPages}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
            >
            다음
            </button>
        </div>

        {selectedMember && (
            <MemberDetailModal
            member={selectedMember}
            onClose={() => setSelectedMember(null)}
            />
        )}
        </div>
    );
};

export default MemberList;