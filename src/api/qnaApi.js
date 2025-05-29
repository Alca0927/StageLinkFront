import jwtAxios from "../util/jwtUtil";
import { API_SERVER_HOST } from "../config/server";
const prefix = `${API_SERVER_HOST}/api/qna`;

// Q&A 목록 조회 - 기존 패턴에 맞게 수정
export const getQnaList = async ({ page = 1, size = 10, question = "" }) => {
  const params = { page, size };
  
  // 검색 키워드가 있을 때만 파라미터에 추가
  if (question) {
    params.question = question;
  }

  const res = await jwtAxios.get(`${prefix}/list`, { params });
  return res.data;
};

// Q&A 상세 조회
export const getOne = async (questionNo) => {
  const res = await jwtAxios.get(`${prefix}/${questionNo}`);
  return res.data;
};

// Q&A 답변 등록 또는 수정
export const putOne = async (questionNo, qna) => {
  const res = await jwtAxios.put(`${prefix}/${questionNo}`, qna);
  return res.data;
};

// Q&A 삭제 (필요시)
export const deleteOne = async (questionNo) => {
  const res = await jwtAxios.delete(`${prefix}/${questionNo}`);
  return res.data;
};

// Q&A 총 개수 조회
export const getCount = async () => {
  const res = await jwtAxios.get(`${prefix}/count`);
  return res.data;
};

/* esther님 코드드
import axios from "axios";

// Spring Boot 서버 주소
const prefix = `${API_SERVER_HOST}/api/qna`;

// Q&A 목록 조회
export const getQnaList = async ({ page = 1, size = 10 }) => {
    const res = await jwtAxios.get(`${prefix}`, {
        params: { page, size }
    });
    return res.data;
};

// Q&A 상세 조회
export const getQnaDetail = async (questionNo) => {
    const res = await jwtAxios.get(`${prefix}/${questionNo}`);
    return res.data;
};

// Q&A 답변 등록 또는 수정
export const updateQnaAnswer = async (questionNo, data) => {
    const res = await jwtAxios.put(`${prefix}/${questionNo}`, data);
    return res.data;
};

// Q&A 총 개수 조회
export const getQnaCount = async () => {
    const res = await jwtAxios.get(`${prefix}/count`);
    return res.data;
};
*/