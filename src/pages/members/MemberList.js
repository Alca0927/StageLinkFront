import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const MemberList = () => {
    const [members, setMembers] = useState([]);
    const [searchName, setSearchName] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const navigate = useNavigate();

    const fetchMembers = async (pageNum = 1, name = '') => {
        try {
        const response = await axios.get(`/api/members`, {
            params: { page: pageNum, name }
        });
        setMembers(response.data.content);
        setTotalPages(response.data.totalPages);
        } catch (error) {
        console.error('회원 목록 조회 실패:', error);
        }
    };

    useEffect(() => {
        fetchMembers(page, searchName);
    }, [page]);

    const handleSearch = () => {
        setPage(1);
        fetchMembers(1, searchName);
    };

    return (
        <div className="flex max-w-6xl mx-auto mt-8">
        <div className="w-3/4 pr-8">
            <h2 className="text-2xl font-bold mb-6">회원 목록</h2>
            <div className="mb-4 flex items-center">
            <input
                type="text"
                placeholder="회원명 검색"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                className="border px-3 py-2 rounded mr-2"
            />
            <button onClick={handleSearch} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">검색</button>
            </div>
            <table className="w-full border text-left">
            <thead>
                <tr className="bg-gray-100">
                <th className="p-2">회원번호</th>
                <th className="p-2">아이디</th>
                <th className="p-2">이름</th>
                <th className="p-2">이메일</th>
                <th className="p-2">상태</th>
                </tr>
            </thead>
            <tbody>
                {members.map(member => (
                <tr
                    key={member.memberNo}
                    className="hover:bg-gray-100 cursor-pointer"
                    onClick={() => navigate(`/admin/membermanager/${member.memberNo}`)}
                >
                    <td className="p-2">{member.memberNo}</td>
                    <td className="p-2">{member.memberId}</td>
                    <td className="p-2">{member.name}</td>
                    <td className="p-2">{member.userEmail}</td>
                    <td className="p-2">{member.memberState}</td>
                </tr>
                ))}
            </tbody>
            </table>
            <div className="flex justify-center mt-4 space-x-2">
            {Array.from({ length: totalPages }, (_, idx) => (
                <button
                key={idx + 1}
                onClick={() => setPage(idx + 1)}
                className={`px-3 py-1 rounded ${page === idx + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                >
                {idx + 1}
                </button>
            ))}
            </div>
        </div>

        <div className="w-1/4 border-l pl-6">
            <h3 className="text-lg font-semibold mb-4">관리 메뉴</h3>
            <button
            onClick={() => navigate('/admin/membermanager/reportlist')}
            className="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
            불법 신고 목록
            </button>
        </div>
        </div>
    );
};

export default MemberList;