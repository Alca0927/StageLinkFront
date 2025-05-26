import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const MemberList = () => {
  const [members, setMembers] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchMembers = async (pageNum = 1, name = '') => {
    const token = localStorage.getItem("accessToken"); // JWT 토큰 로컬스토리지에서 가져오기

    try {
      const response = await axios.get('/api/members', {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: { page: pageNum, name }
      });

      console.log("🔥 서버 응답:", response.data);
      setMembers(response.data.dtoList || []);
      setTotalPages(response.data.totalPage || 1);
      setError(null);
    } catch (error) {
      console.error('❗ 회원 목록 조회 실패:', error);
      const message =
        error.response?.data?.error ||
        error.response?.data?.message ||
        '서버와의 연결에 문제가 있습니다.';
      setMembers([]);
      setError(message);
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
      <div className="w-full">
        <h2 className="text-2xl font-bold mb-6">회원 목록</h2>

        {/* 검색창 */}
        <div className="mb-4 flex items-center gap-4">
          <input
            type="text"
            placeholder="회원명 검색"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            className="border px-3 py-2 rounded w-64"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            검색
          </button>
        </div>

        {/* 테이블 */}
        <table className="w-full table-fixed border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="w-1/12 px-4 py-2 border text-center">회원번호</th>
              <th className="w-2/12 px-4 py-2 border text-center">아이디</th>
              <th className="w-2/12 px-4 py-2 border text-center">이름</th>
              <th className="w-4/12 px-4 py-2 border text-center">이메일</th>
              <th className="w-3/12 px-4 py-2 border text-center">상태</th>
            </tr>
          </thead>
          <tbody>
            {error ? (
              <tr>
                <td colSpan="5" className="text-center text-red-500 py-4">
                  ⚠ {error}
                </td>
              </tr>
            ) : members.length === 0 ? (
              <tr className="bg-gray-100">
                <td colSpan="5" className="text-center text-gray-500 py-4">
                  🔍 검색 결과가 없습니다.
                </td>
              </tr>
            ) : (
              members.map((member) => (
                <tr
                  key={member.memberNo}
                  className="bg-gray-100 cursor-pointer"
                  onClick={() =>
                    navigate(`/admin/membermanager/members/${member.memberNo}`)
                  }
                >
                  <td className="px-4 py-2 border text-center">{member.memberNo}</td>
                  <td className="px-4 py-2 border text-center">{member.userId}</td>
                  <td className="px-4 py-2 border text-center">{member.name}</td>
                  <td className="px-4 py-2 border text-center">{member.userEmail}</td>
                  <td className="px-4 py-2 border text-center">{member.memberState}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* 페이지네이션 */}
        <div className="flex justify-center mt-4 space-x-2">
          {Array.from({ length: totalPages }, (_, idx) => (
            <button
              key={idx + 1}
              onClick={() => setPage(idx + 1)}
              className={`px-3 py-1 rounded ${
                page === idx + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MemberList;
