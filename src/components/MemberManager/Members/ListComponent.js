import { useEffect, useState } from 'react';
import { getList } from "../../../api/memberApi";
import useCustomMove from "../../../hooks/useCustomMove";
import PageComponent from "../../common/PageComponent";

const initState = {
  dtoList: [],
  pageNumList: [],
  pageRequestDTO: null,
  prev: false,
  next: false,
  totalCount: 0,
  prevPage: 0,
  nextPage: 0,
  totalPage: 0,
  current: 0
};

const ListComponent = () => {
  const { page, size, refresh, moveToList, moveToRead } = useCustomMove();
  const [serverData, setServerData] = useState(initState);
  const [searchName, setSearchName] = useState('');
  const [error, setError] = useState(null);;

  const fetchMembers = async (pageNum = page, name = '') => {
    try {
      const data = await getList({ page: pageNum, size, name });
      console.log("🔥 서버 응답:", data);
      setServerData(data);
      setError(null);
    } catch (error) {
      console.error('❗ 회원 목록 조회 실패:', error);
      const message = '서버와의 연결에 문제가 있습니다.';
      setServerData(initState);
      setError(message);
    }
  };

  useEffect(() => {
    fetchMembers(page, searchName);
  }, [page, size, refresh]);

  const handleSearch = () => {
    moveToList(1, "members", { name: searchName });
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
              <th className="w-2/12 px-4 py-2 border text-center">회원번호</th>
              <th className="w-2/12 px-4 py-2 border text-center">아이디</th>
              <th className="w-2/12 px-4 py-2 border text-center">이름</th>
              <th className="w-2/12 px-4 py-2 border text-center">가입일자</th>
              <th className="w-4/12 px-4 py-2 border text-center">이메일</th>
              <th className="w-2/12 px-4 py-2 border text-center">상태</th>
            </tr>
          </thead>
          <tbody>
            {error ? (
              <tr>
                <td colSpan="6" className="text-center text-red-500 py-4">
                  ⚠ {error}
                </td>
              </tr>
            ) : !serverData.dtoList || serverData.dtoList.length === 0 ? (
              <tr className="bg-gray-100">
                <td colSpan="6" className="text-center text-gray-500 py-4">
                  🔍 검색 결과가 없습니다.
                </td>
              </tr>
            ) : (
              serverData.dtoList.map((member) => (
                <tr
                  key={member.member_no}
                  className="bg-gray-100 cursor-pointer hover:bg-gray-200"
                  onClick={() => {
                    console.log(member.memberNo);
                    moveToRead(member.memberNo, "members");
                  }}
                >
                  <td className="px-4 py-2 border text-center">{member.memberNo}</td>
                  <td className="px-4 py-2 border text-center">{member.userId}</td>
                  <td className="px-4 py-2 border text-center">{member.name}</td>
                  <td className="px-4 py-2 border text-center">{member.joinedDate || '-'}</td>
                  <td className="px-4 py-2 border text-center">{member.userEmail}</td>
                  <td className="px-4 py-2 border text-center">{member.memberState}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <PageComponent 
          serverData={serverData} 
          movePage={(pageParam) => moveToList(pageParam, "members")}
        />
      </div>
    </div>
  );
};

export default ListComponent;