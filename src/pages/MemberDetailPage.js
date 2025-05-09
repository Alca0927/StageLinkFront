import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const MemberDetailPage = () => {
    const { id } = useParams(); // mbrNo
    const navigate = useNavigate();
    const [member, setMember] = useState(null);
    const [newStat, setNewStat] = useState('');

    useEffect(() => {
        const fetchMember = async () => {
        try {
            const res = await axios.get(`/api/members/${id}`);
            setMember(res.data);
            setNewStat(res.data.stat);
        } catch (error) {
            console.error('회원 조회 실패:', error);
        }
        };
        fetchMember();
    }, [id]);

    const handleUpdate = async () => {
        try {
        await axios.patch(`/api/members/${id}/status`, null, {
            params: { stat: newStat },
        });
        alert('회원 상태가 변경되었습니다.');
        navigate('/');
        } catch (error) {
        console.error('상태 변경 실패:', error);
        }
    };

    if (!member) return <div>회원 정보를 불러오는 중...</div>;

    return (
    <div className="max-w-xl mx-auto bg-white shadow-md p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">회원 상태 수정</h2>
        <ul className="mb-6 space-y-2">
            <li><strong>회원번호:</strong> {member.mbrNo}</li>
            <li><strong>회원ID:</strong> {member.mbrId}</li>
            <li><strong>이름:</strong> {member.mbrName}</li>
            <li><strong>이메일:</strong> {member.email}</li>
        </ul>

        <div className="mb-6">
            <label className="block font-medium mb-1">회원 상태</label>
            <select
            value={newStat}
            onChange={(e) => setNewStat(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            >
            <option value="ACTIVE">ACTIVE</option>
            <option value="BLOCKED">BLOCKED</option>
            <option value="INACTIVE">INACTIVE</option>
            </select>
        </div>

        <div className="flex justify-between mt-6">
            <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
            >
            ← 목록으로
            </button>
            <button
            onClick={handleUpdate}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
            수정 확인
            </button>
        </div>
        </div>
    );
};

export default MemberDetailPage;