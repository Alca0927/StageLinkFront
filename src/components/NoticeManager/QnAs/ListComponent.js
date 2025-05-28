/*
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageComponent from "../../common/PageComponent";

const QnaList = () => {
  const [qnas, setQnas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;

  const navigate = useNavigate();

  const fetchQnas = async (pageNum = 1) => {
    setLoading(true);
    const token = localStorage.getItem("accessToken"); // ✅ JWT 토큰 가져오기

    try {
      const res = await fetch(`/api/qna/list?page=${pageNum}&size=${pageSize}`, {
        headers: {
          Authorization: `Bearer ${token}` // ✅ 인증 헤더 추가
        }
      });
      if (!res.ok) throw new Error('서버 오류');
      const data = await res.json();
      setQnas(Array.isArray(data.dtoList) ? data.dtoList : []);
      setTotalPages(typeof data.totalPage === 'number' ? data.totalPage : 1);
    } catch (err) {
      console.error('Q&A 불러오기 실패:', err);
      setError('Q&A 데이터를 불러오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQnas(page);
  }, [page]);

  return (
    <div className="max-w-7xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Q&A 목록</h2>

      <table className="w-full table-fixed border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="w-1/12 px-2 py-2 border">Q&A 번호</th>
            <th className="w-1/12 px-2 py-2 border">회원 번호</th>
            <th className="w-3/12 px-2 py-2 border">질문</th>
            <th className="w-3/12 px-2 py-2 border">답변</th>
            <th className="w-2/12 px-2 py-2 border">작성일</th>
            <th className="w-2/12 px-2 py-2 border">평점</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {loading ? (
            <tr>
              <td colSpan="6" className="text-center p-4">로딩 중...</td>
            </tr>
          ) : error ? (
            <tr>
              <td colSpan="6" className="text-center p-4 text-red-500">{error}</td>
            </tr>
          ) : qnas.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center p-4">Q&A 데이터가 없습니다.</td>
            </tr>
          ) : (
            qnas.map(qna => (
              <tr
                key={qna.questionNo}
                className="border-t cursor-pointer hover:bg-gray-100"
                onClick={() => navigate(`/admin/noticemanager/qna/entry/${qna.questionNo}`)}
              >
                <td className="px-2 py-2 border text-center">{qna.questionNo}</td>
                <td className="px-2 py-2 border text-center">{qna.memberNo}</td>
                <td className="px-2 py-2 border break-words">{qna.questionContents}</td>
                <td className="px-2 py-2 border break-words">{qna.answerContents}</td>
                <td className="px-2 py-2 border text-center">{new Date(qna.createDate).toLocaleDateString('ko-KR')}</td>
                <td className="px-2 py-2 border text-center">{qna.qnaRating}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <PageComponent
          serverData={serverData}
          movePage={(pageParam) => moveToList(pageParam, "notices")}
        />

    </div>
  );
};

export default QnaList;
*/

import { useEffect, useState } from "react";
import { getQnaList } from "../../../api/qnaApi";
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
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    getQnaList({ page, size, question: searchKeyword }).then((data) => {
      console.log("📋 Q&A 리스트 응답:", data);
      setServerData(data);
    });
  }, [page, size, refresh]);

  const handleSearch = () => {
    moveToList(1, "qna", { question: searchKeyword });
  };

  return (
    <div>
      {/* 검색창 */}
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="질문 내용 검색..."
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          className="border px-3 py-2 rounded w-64"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          검색
        </button>
      </div>

      {/* 테이블 */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase">
                Q&A 번호
              </th>
              <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase">
                회원 번호
              </th>
              <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase">
                질문
              </th>
              <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase">
                답변 상태
              </th>
              <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase">
                작성일
              </th>
              <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase">
                평점
              </th>
            </tr>
          </thead>
          <tbody>
            {serverData.dtoList.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                  🔍 검색 결과가 없습니다.
                </td>
              </tr>
            ) : (
              serverData.dtoList.map((item) => (
                <tr
                  key={item.questionNo}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() =>
                    moveToRead(`${item.questionNo}`, "qna")
                  }
                >
                  <td className="px-6 py-4 border-b text-sm">
                    {item.questionNo}
                  </td>
                  <td className="px-6 py-4 border-b text-sm">
                    {item.memberNo}
                  </td>
                  <td className="px-6 py-4 border-b text-sm">
                    <div className="truncate max-w-xs">
                      {item.questionContents}
                    </div>
                  </td>
                  <td className="px-6 py-4 border-b text-sm">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        item.answerContents
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {item.answerContents ? "답변완료" : "답변대기"}
                    </span>
                  </td>
                  <td className="px-6 py-4 border-b text-sm">
                    {item.createDate
                      ? new Date(item.createDate).toLocaleDateString('ko-KR')
                      : "미정"}
                  </td>
                  <td className="px-6 py-4 border-b text-sm">
                    {item.qnaRating ? `⭐ ${item.qnaRating}` : "-"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* 페이지네이션 */}
      <PageComponent
        serverData={serverData}
        movePage={(pageParam) => moveToList(pageParam, "qna")}
      />
    </div>
  );
};

export default ListComponent;