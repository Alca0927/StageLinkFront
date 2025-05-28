import { useState } from "react";
import { postAdd } from "../../../api/noticeApi";
import useCustomMove from "../../../hooks/useCustomMove";

const initState = {
  noticeTitle: '',
  noticeContent: ''
};

const NoticeAddComponent = () => {
  const [notice, setNotice] = useState(initState);
  const [loading, setLoading] = useState(false);
  const { moveToList } = useCustomMove();

  const handleChangeNotice = (e) => {
    notice[e.target.name] = e.target.value;
    setNotice({ ...notice });
  };

  const handleClickAdd = () => {
    if (!notice.noticeTitle.trim()) {
      alert('제목을 입력해주세요.');
      return;
    }
    
    if (!notice.noticeContent.trim()) {
      alert('내용을 입력해주세요.');
      return;
    }

    setLoading(true);
    
    const noticeObj = {
      ...notice,
      noticeDate: new Date().toISOString().split('T')[0]
    };

    postAdd(noticeObj)
      .then(() => {
        console.log("✅ 공지사항 등록 성공");
        alert('공지사항이 등록되었습니다.');
        setNotice(initState);
        moveToList(1, "notices");
      })
      .catch((err) => {
        console.error('❌ 공지사항 등록 실패:', err);
        alert('공지사항 등록 중 오류가 발생했습니다.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleClickList = () => {
    moveToList(1, "notices");
  };

  return (
    <div className="border-2 border-blue-200 mt-10 mr-2">
      <div className="flex flex-wrap mx-auto p-6">
        
        {/* 제목 */}
        <div className="w-full mb-6">
          <h2 className="text-2xl font-bold text-center">공지사항 등록</h2>
        </div>

        {/* 입력 폼 */}
        <div className="w-full bg-white rounded-lg shadow-sm p-6 mb-6">
          
          {/* 제목 입력 */}
          <div className="mb-6">
            <label className="block font-semibold text-gray-700 mb-2">
              제목 <span className="text-red-500">*</span>
            </label>
            <input
              name="noticeTitle"
              type="text"
              value={notice.noticeTitle}
              onChange={handleChangeNotice}
              placeholder="공지사항 제목을 입력하세요"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* 내용 입력 */}
          <div className="mb-6">
            <label className="block font-semibold text-gray-700 mb-2">
              내용 <span className="text-red-500">*</span>
            </label>
            <textarea
              name="noticeContent"
              value={notice.noticeContent}
              onChange={handleChangeNotice}
              placeholder="공지사항 내용을 입력하세요"
              rows={12}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
            />
          </div>
        </div>

        {/* 버튼 그룹 */}
        <div className="w-full flex justify-center gap-3">
          <button
            onClick={handleClickList}
            className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
            disabled={loading}
          >
            목록
          </button>
          <button
            onClick={handleClickAdd}
            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors disabled:bg-blue-300"
            disabled={loading}
          >
            {loading ? '등록 중...' : '등록'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoticeAddComponent;