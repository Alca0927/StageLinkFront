import jwtAxios from "../util/jwtUtil"; // ✅ 인증 포함 axios
import { API_SERVER_HOST } from "../config/server";

const prefix = `${API_SERVER_HOST}/admin`;


 //Q&A 목록 조회 (검색, 페이징 포함) + 디버깅 로그 포함


export const getQnaList = async (pageParam) => {
  const { page, size, question } = pageParam;
  console.log("검색어 : ", question)
  try {
    const res = await jwtAxios.get(`${prefix}/qna/list`, { params : {page, size, question} });
    if (!res.data) {
      console.warn(" 응답 데이터가 없습니다.");
    } else if (!Array.isArray(res.data.dtoList)) {
      console.warn(" dtoList가 배열이 아님 또는 누락됨:", res.data.dtoList);
    } else {
      console.log(" dtoList 항목 수:", res.data.dtoList.length);
    }
    return res.data;
  } catch (err) {
    console.error("❌ [getQnaList] 목록 조회 실패:", err);
    throw err;
  }
};


 //Q&A 상세 조회
 
export const getOne = async (questionNo) => {
  console.log(`📥 [getOne] Q&A 번호: ${questionNo}`);
  const res = await jwtAxios.get(`${prefix}/qna/${questionNo}`);
  console.log("📦 [getOne] 응답:", res.data);
  return res.data;
};


//Q&A 답변 등록 또는 수정

export const putOne = async (questionNo, qna) => {
  console.log(`✏️ [putOne] 수정 요청 - questionNo: ${questionNo}`, qna);
  const res = await jwtAxios.put(`${prefix}/qna/${questionNo}/answer`, qna); // <-- ✅ 수정된 경로
  console.log("📦 [putOne] 응답:", res.data);
  return res.data;
};



//Q&A 삭제

export const deleteOne = async (questionNo) => {
  console.log(`🗑️ [deleteOne] 삭제 요청 - questionNo: ${questionNo}`);
  const res = await jwtAxios.delete(`${prefix}/qna/${questionNo}`);
  console.log("📦 [deleteOne] 응답:", res.data);
  return res.data;
};


//Q&A 총 개수 조회

export const getCount = async () => {

  console.log("📊 [getCount] 전체 개수 요청");
  const res = await jwtAxios.get(`${prefix}/qna/count`);
  console.log("📦 [getCount] 응답:", res.data);
  return res.data;
};