import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOne, putOne } from "../../../api/noticeApi";
import useCustomMove from "../../../hooks/useCustomMove";

const initState = {
  noticeNo: 0,
  noticeTitle: '',
  noticeContent: '',
  noticeDate: ''
};

const NoticeReadComponent = () => {
  const { noticeNo } = useParams();
  const [notice, setNotice] = useState(initState);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { moveToList } = useCustomMove();

  useEffect(() => {
    console.log("📦 useParams로 받은 noticeNo:", noticeNo);

    if (!noticeNo) {
      setError('유효하지 않은 공지사항 번호입니다.');
      setLoading(false);
      return;
    }

    // getOne에 전달하는 값 확인
    console.log("📨 getOne 호출 전 noticeNo:", noticeNo);

    getOne(noticeNo)
      .then((data) => {
        console.log("📋 공지사항 상세 응답:", data);

        // 데이터가 없을 경우 체크
        if (!data || !data.noticeNo) {
          setError('해당 공지사항이 존재하지 않습니다.');
          setNotice(initState);
        } else {
          setNotice(data);
          setError(null);
        }
      })
      .catch((err) => {
        console.error('❌ 공지사항 상세 조회 실패:', err);
        if (err.response?.status === 404) {
          setError('해당 공지사항이 존재하지 않습니다.');
        } else {
          setError('공지사항을 불러오는 데 실패했습니다.');
        }
        setNotice(initState);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [noticeNo]);

  const handleClickList = (pageParam) => {
    moveToList(pageParam, "notices");
  };

  const handleChange = (field) => (e) => {
    setNotice(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleModify = async () => {
    try {
      putOne(notice);
      alert("수정이 완료되었습니다.");
    } catch (error){
      console.error(error);
    }
  }

  if (loading) {
    return (
      <div className="border-2 border-blue-200 mt-10 mr-2">
        <div className="flex flex-wrap mx-auto p-6">
          <div className="w-full text-center p-8 text-gray-500">
            공지사항을 불러오는 중...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="border-2 border-blue-200 mt-10 mr-2">
        <div className="flex flex-wrap mx-auto p-6">
          <div className="w-full text-center p-8 text-red-500">
            ⚠ {error}
          </div>
          <div className="w-full text-center">
            <button
              onClick={handleClickList}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              목록으로 돌아가기
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="border-2 border-blue-200 mt-10 mr-2">
      <div className="flex flex-wrap mx-auto p-6">

        <div className="w-full mb-6">
          <h2 className="text-2xl font-bold text-center">공지사항 상세</h2>
        </div>

        <div className="w-full bg-white rounded-lg shadow-sm p-6 mb-6">

          <div className="mb-6">
            <label className="font-semibold text-gray-700 mb-2 block">제목</label>
            <input
              type="text"
              value={notice.noticeTitle}
              readOnly={false}
              onChange={handleChange("noticeTitle")}
              className="p-4 w-full bg-gray-50 rounded border text-lg font-medium"
            />

          </div>

          <div className="mb-6">
            <label className="font-semibold text-gray-700 mb-2 block">작성일</label>
            <input
              type="text"
              value={notice.noticeDate ? new Date(notice.noticeDate).toLocaleString('ko-KR') : ''}
              readOnly={true}
              className="p-4 w-full bg-gray-50 rounded border text-lg font-medium"
            />
          </div>

          <div className="mb-6">
            <label className="font-semibold text-gray-700 mb-2 block">내용</label>
            <input
              type="text"
              value={notice.noticeContent}
              readOnly={false}
              onChange={handleChange("noticeContent")}
              className="p-4 w-full bg-gray-50 rounded border text-lg font-medium"
            />
          </div>
        </div>

        {/* 버튼 */}
        <div className="w-full flex justify-center gap-3">
          <button
            onClick={handleClickList}
            className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
          >
            목록
          </button>
          <button
            onClick={handleModify}
            className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
          >
            수정
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoticeReadComponent;
