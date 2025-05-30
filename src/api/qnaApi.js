import jwtAxios from "../util/jwtUtil"; // ✅ 인증 포함 axios
import { API_SERVER_HOST } from "../config/server";

const prefix = `${API_SERVER_HOST}/api/qna`;


 //Q&A 목록 조회 (검색, 페이징 포함) + 디버깅 로그 포함


export const getQnaList = async ({ page = 1, size = 10, question = "" }) => {
  const params = { page, size };
  if (question) {
    params.question = question;
  }

  console.log("📤 [getQnaList] 요청 파라미터:", params);

  try {
    const res = await jwtAxios.get(`${prefix}/list`, { params });

    console.log("✅ [getQnaList] 전체 응답:", res);
    console.log("📦 [getQnaList] 응답 본문 (res.data):", res.data);

    if (!res.data) {
      console.warn("⚠️ 응답 데이터가 없습니다.");
    } else if (!Array.isArray(res.data.dtoList)) {
      console.warn("⚠️ dtoList가 배열이 아님 또는 누락됨:", res.data.dtoList);
    } else {
      console.log("🟢 dtoList 항목 수:", res.data.dtoList.length);
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
  const res = await jwtAxios.get(`${prefix}/${questionNo}`);
  console.log("📦 [getOne] 응답:", res.data);
  return res.data;
};


//Q&A 답변 등록 또는 수정

export const putOne = async (questionNo, qna) => {
  console.log(`✏️ [putOne] 수정 요청 - questionNo: ${questionNo}`, qna);
  const res = await jwtAxios.put(`${prefix}/${questionNo}/answer`, qna); // <-- ✅ 수정된 경로
  console.log("📦 [putOne] 응답:", res.data);
  return res.data;
};



//Q&A 삭제

export const deleteOne = async (questionNo) => {
  console.log(`🗑️ [deleteOne] 삭제 요청 - questionNo: ${questionNo}`);
  const res = await jwtAxios.delete(`${prefix}/${questionNo}`);
  console.log("📦 [deleteOne] 응답:", res.data);
  return res.data;
};


//Q&A 총 개수 조회

export const getCount = async () => {

  console.log("📊 [getCount] 전체 개수 요청");
  const res = await jwtAxios.get(`${prefix}/count`);
  console.log("📦 [getCount] 응답:", res.data);
  return res.data;
};