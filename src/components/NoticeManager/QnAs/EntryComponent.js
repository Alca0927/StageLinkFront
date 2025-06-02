import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOne, putOne } from "../../../api/qnaApi";
import useCustomMove from "../../../hooks/useCustomMove";

const initState = {
  questionNo: 0,
  memberNo: 0,
  questionContents: "",
  answerContents: "",
  createDate: ""
};

const EntryComponent = () => {
  const { questionNo } = useParams();
  const { moveToList } = useCustomMove();
  const [qna, setQna] = useState(initState);
  const [isLoaded, setIsLoaded] = useState(false); // ✅ 중복 호출 방지

  useEffect(() => {
    if (!isLoaded && questionNo) {
      getOne(questionNo)
        .then((data) => {
          setQna(data);
          setIsLoaded(true); // ✅ 한 번만 실행
        })
        .catch((error) => {
          console.error("Q&A 불러오기 실패:", error);
          moveToList(1, "qna");
        });
    }
  }, [isLoaded, questionNo, moveToList]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("✅ 입력 변경됨:", name, value);
    setQna((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleModify = async (pageParam) => {
    try {
      const updateData = {
        questionNo: parseInt(qna.questionNo),
        answerContents: qna.answerContents
      };
      await putOne(qna.questionNo, updateData);
      alert("답변이 등록되었습니다.");
      moveToList(pageParam, "Q&A");
    } catch (error) {
      console.error("답변 수정 실패:", error);
      alert("수정 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow-md rounded-lg p-8 border border-gray-300">
      <h2 className="text-2xl font-bold text-blue-600 mb-6">Q&A 답변</h2>

      {/* Q&A 번호 */}
      <div className="flex items-center py-2 border-b text-sm">
        <div className="w-1/4 text-right pr-4 font-semibold text-gray-600">Q&A 번호</div>
        <input
          type="text"
          value={qna.questionNo || ""}
          readOnly
          className="w-3/4 h-8 p-2 text-sm bg-gray-100 rounded border border-gray-200 text-gray-700"
        />
      </div>

      {/* 회원 번호 */}
      <div className="flex items-center py-2 border-b text-sm">
        <div className="w-1/4 text-right pr-4 font-semibold text-gray-600">회원 번호</div>
        <input
          type="text"
          value={qna.memberNo || ""}
          readOnly
          className="w-3/4 h-8 p-2 text-sm bg-gray-100 rounded border border-gray-200 text-gray-700"
        />
      </div>

      {/* 작성일 */}
      <div className="flex items-center py-2 border-b text-sm">
        <div className="w-1/4 text-right pr-4 font-semibold text-gray-600">작성일</div>
        <input
          type="text"
          value={qna.createDate || ""}
          readOnly
          className="w-3/4 h-8 p-2 text-sm bg-gray-100 rounded border border-gray-200 text-gray-700"
        />
      </div>

      {/* 질문 내용 */}
      <div className="flex items-start py-4 border-b">
        <div className="w-1/4 text-right pr-4 font-semibold text-gray-700">질문 내용</div>
        <textarea
          value={qna.questionContents || ""}
          readOnly
          rows={8}
          className="w-3/4 p-3 resize-none rounded shadow-sm border border-gray-300 text-gray-900 font-medium bg-gray-100"
        />
      </div>

      {/* 답변 내용 (입력 가능) */}
      <div className="flex items-start py-4 border-b">
        <div className="w-1/4 text-right pr-4 font-semibold text-gray-700">답변 내용</div>
        <textarea
          name="answerContents"
          value={qna.answerContents || ""}
          onChange={handleChange}
          rows={6}
          className="w-3/4 p-3 resize-none rounded shadow-sm border border-gray-300 text-gray-900 font-medium bg-white"
          placeholder="답변을 입력하세요..."
        />
      </div>

      <div className="flex justify-end space-x-4 mt-10">
        <button
          type="button"
          className="px-6 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded"
          onClick={(pageParam) => moveToList(pageParam, "Q&A")}
        >
          목록
        </button>
        <button
          type="button"
          className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded"
          onClick={handleModify}
        >
          등록
        </button>
      </div>
    </div>
  );
};

export default EntryComponent;
