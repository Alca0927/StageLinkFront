import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOne, putOne } from "../../../api/qnaApi";
import useCustomMove from "../../../hooks/useCustomMove";

const initState = {
  questionNo: 0,
  memberNo: 0,
  questionContents: '',
  answerContents: '',
  qnaRating: 0,
  createDate: ''
};

const EntryComponent = () => {
  const { questionNo } = useParams();
  const { moveToList } = useCustomMove();
  const [qna, setQna] = useState({ ...initState });

  useEffect(() => {
    getOne(questionNo).then((data) => {
      console.log("📋 Q&A 상세 응답:", data);
      setQna(data);
    }).catch(err => {
      console.error("❌ Q&A 조회 오류:", err);
      // 에러 발생 시 목록으로 이동
      moveToList(1, "qna");
    });
  }, [questionNo, moveToList]);

  const handleChangeQna = (e) => {
    qna[e.target.name] = e.target.value;
    setQna({ ...qna });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const updateData = {
      questionNo: parseInt(questionNo),
      answerContents: qna.answerContents,
      qnaRating: parseInt(qna.qnaRating)
    };

    putOne(questionNo, updateData).then(() => {
      console.log("✅ Q&A 답변 등록 완료");
      alert('답변이 등록되었습니다.');
      moveToList(1, "qna");
    }).catch(err => {
      console.error("❌ 답변 등록 오류:", err);
      alert('답변 등록 중 오류가 발생했습니다.');
    });
  };

  const handleClickList = () => {
    moveToList(1, "qna");
  };

  return (
    <div className="border-2 border-sky-200 mt-10 m-2 p-4">
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">Q&A 번호</div>
          <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
            {qna.questionNo}
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">회원 번호</div>
          <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
            {qna.memberNo}
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">작성일</div>
          <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
            {qna.createDate ? new Date(qna.createDate).toLocaleDateString('ko-KR') : ''}
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">질문 내용</div>
          <div className="w-4/5 p-6 rounded-r border border-solid shadow-md bg-gray-50">
            <div className="whitespace-pre-line">
              {qna.questionContents}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">답변 내용</div>
          <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
            <textarea
              className="w-full p-3 rounded border border-gray-300 resize-none"
              name="answerContents"
              rows="6"
              value={qna.answerContents}
              onChange={handleChangeQna}
              placeholder="답변을 입력하세요..."
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">평점</div>
          <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
            <select
              className="p-2 rounded border border-gray-300 w-32"
              name="qnaRating"
              value={qna.qnaRating}
              onChange={handleChangeQna}
            >
              <option value={0}>평점 선택</option>
              <option value={1}>⭐ 1점</option>
              <option value={2}>⭐ 2점</option>
              <option value={3}>⭐ 3점</option>
              <option value={4}>⭐ 4점</option>
              <option value={5}>⭐ 5점</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex justify-end p-4">
        <button
          type="button"
          className="inline-block rounded p-4 m-2 text-xl w-32 text-white bg-red-500 hover:bg-red-600"
          onClick={handleClickList}
        >
          목록
        </button>
        <button
          type="button"
          className="inline-block rounded p-4 m-2 text-xl w-32 text-white bg-blue-500 hover:bg-blue-600"
          onClick={handleSubmit}
        >
          등록
        </button>
      </div>
    </div>
  );
};

export default EntryComponent;