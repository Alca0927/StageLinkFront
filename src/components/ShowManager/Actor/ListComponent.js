import { useEffect, useState } from 'react';
import { getList } from '../../../api/actorApi';
import useCustomMove from '../../../hooks/useCustomMove';
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
  current: 0,
};

const ListComponent = () => {
  const { page, size, refresh, moveToList, moveToRead, moveToAdd } = useCustomMove();
  const [serverData, setServerData] = useState(initState);
  const [searchKeyword, setSearchKeyword] = useState('');

  useEffect(() => {
    getList({ page, size, name: searchKeyword }).then((data) => {
      console.log('서버 응답:', data);
      setServerData(data);
    });
  }, [page, size, refresh, searchKeyword]);


  const handleSearch = () => {
    moveToList(1, 'actor', { name: searchKeyword });
  };

   const handleAdd = () => {
    moveToAdd("actor")
  }

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      {/* 검색창 */}
      <div className="mb-4 flex items-center gap-4">
        <input
          type="text"
          placeholder="이름으로 검색"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          className="border px-3 py-2 rounded w-64"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          검색
        </button>
      </div>

      <button onClick={handleAdd}>배우 추가</button>

      {/* 테이블 */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 border text-center">배우 번호</th>
              <th className="px-4 py-3 border text-center">이름</th>
              <th className="px-4 py-3 border text-center">프로필</th>
            </tr>
          </thead>
          <tbody>
            {!serverData.dtoList || serverData.dtoList.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center text-gray-500 py-6">
                  🔍 검색 결과가 없습니다.
                </td>
              </tr>
            ) : (
              serverData.dtoList.map((actor) => (
                <tr
                  key={actor.actorNo}
                  onClick={() => moveToRead(actor.actorNo, 'actor')}
                  className="cursor-pointer hover:bg-blue-50 transition-colors"
                >
                  <td className="px-4 py-3 border text-center">{actor.actorNo}</td>
                  <td className="px-4 py-3 border text-center">{actor.actorName}</td>
                  <td className="px-4 py-3 border text-center">{actor.actorProfile}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <PageComponent serverData={serverData} movePage={(pageParam) => moveToList(pageParam, "actor")}></PageComponent>

    </div>
  );
};

export default ListComponent;
