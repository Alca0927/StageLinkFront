import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const MemberDetailPage = () => {
  const { member_no } = useParams();
  const navigate = useNavigate();
  const [member, setMember] = useState(null);
  const [memberState, setMemberState] = useState('');

  useEffect(() => {
    const fetchMemberDetail = async () => {
      const token = localStorage.getItem("accessToken");
      try {
        const response = await axios.get(`/api/members/${member_no}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setMember(response.data);
        setMemberState(response.data.memberState);
      } catch (error) {
        console.error('회원 상세 조회 실패:', error);
      }
    };
    fetchMemberDetail();
  }, [member_no]);

  const handleUpdateState = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      await axios.put(`/api/members/${member_no}/state`, { memberState }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert('회원 상태가 수정되었습니다.');
    } catch (error) {
      console.error('회원 상태 수정 실패:', error);
      alert('수정 중 오류 발생');
    }
  };

  if (!member) return <div className="p-4">회원 정보를 불러오는 중...</div>;

  return (
    <div className="flex max-w-6xl mx-auto mt-8">
      <div className="w-3/4 pr-8">
        <h2 className="text-2xl font-bold mb-6">회원 상세 정보</h2>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div><strong>회원 번호:</strong> {member.memberNo}</div>
          <div><strong>회원 ID:</strong> {member.memberId}</div>
          <div><strong>이름:</strong> {member.name}</div>
          <div><strong>닉네임:</strong> {member.nickname}</div>
          <div><strong>이메일:</strong> {member.userEmail}</div>
          <div>
            <strong>회원 상태:</strong>
            <select
              value={memberState}
              onChange={(e) => setMemberState(e.target.value)}
              className="ml-2 border rounded px-2 py-1"
            >
              <option value="ACTIVE">ACTIVE</option>
              <option value="INACTIVE">INACTIVE</option>
              <option value="BLOCKED">BLOCKED</option>
            </select>
          </div>
        </div>

        <div className="flex space-x-4">
          <button
            onClick={handleUpdateState}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            수정
          </button>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            뒤로가기
          </button>
        </div>
      </div>
    </div>
  );
};

export default MemberDetailPage;
