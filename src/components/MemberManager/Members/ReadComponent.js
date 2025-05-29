import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOne, updateState } from "../../../api/memberApi";
import useCustomMove from "../../../hooks/useCustomMove";

const initState = {
  memberNo: 0,
  memberId: '',
  name: '',
  nickname: '',
  userEmail: '',
  joinedDate: '',
  signupType: '',
  memberState: ''
};

const MemberReadComponent = () => {
  const { memberNo } = useParams();
  const [member, setMember] = useState(initState);
  const [memberState, setMemberState] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { moveToList } = useCustomMove();

  useEffect(() => {
    if (!memberNo) {
      setError('유효하지 않은 회원 번호입니다.');
      setLoading(false);
      return;
    }

    getOne(memberNo)
      .then((data) => {
        console.log("👤 회원 상세 응답:", data);
        setMember(data);
        setMemberState(data.memberState);
        setError(null);
      })
      .catch((err) => {
        console.error('❌ 회원 상세 조회 실패:', err);
        if (err.response?.status === 404) {
          setError('유효하지 않은 회원 번호입니다.');
        } else {
          setError('회원 정보를 불러오는 데 실패했습니다.');
        }
        setMember(initState);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [memberNo]);

  const handleUpdateState = async () => {
    try {
      await updateState({ memberNo: member.memberNo, memberState });
      console.log("✅ 회원 상태 수정 성공");
      setMember({ ...member, memberState });
      alert('회원 상태가 수정되었습니다.');
    } catch (error) {
      console.error('❌ 회원 상태 수정 실패:', error);
      alert('수정 중 오류가 발생했습니다.');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleClickList = () => {
    moveToList(1, "members");
  };

  if (loading) {
    return (
      <div className="border-2 border-blue-200 mt-10 mr-2">
        <div className="flex flex-wrap mx-auto p-6">
          <div className="w-full text-center p-8 text-gray-500">
            회원 정보를 불러오는 중...
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
        
        {/* 제목 */}
        <div className="w-full mb-6">
          <h2 className="text-2xl font-bold text-center">회원 상세 정보</h2>
        </div>

        {/* 상세 정보 */}
        <div className="w-full bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="space-y-4">
              <div className="flex flex-col">
                <label className="font-semibold text-gray-700 mb-1">회원 번호</label>
                <div className="p-3 bg-gray-50 rounded border">
                  {member.memberNo}
                </div>
              </div>
              
              <div className="flex flex-col">
                <label className="font-semibold text-gray-700 mb-1">회원 ID</label>
                <div className="p-3 bg-gray-50 rounded border">
                  {member.userId}
                </div>
              </div>
              
              <div className="flex flex-col">
                <label className="font-semibold text-gray-700 mb-1">이름</label>
                <div className="p-3 bg-gray-50 rounded border">
                  {member.name}
                </div>
              </div>

              <div className="flex flex-col">
                <label className="font-semibold text-gray-700 mb-1">닉네임</label>
                <div className="p-3 bg-gray-50 rounded border">
                  {member.nickname}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col">
                <label className="font-semibold text-gray-700 mb-1">이메일</label>
                <div className="p-3 bg-gray-50 rounded border">
                  {member.userEmail}
                </div>
              </div>
              
              <div className="flex flex-col">
                <label className="font-semibold text-gray-700 mb-1">가입일자</label>
                <div className="p-3 bg-gray-50 rounded border">
                  {member.joinedDate ? new Date(member.joinedDate).toLocaleDateString('ko-KR') : ''}
                </div>
              </div>

              <div className="flex flex-col">
                <label className="font-semibold text-gray-700 mb-1">회원가입유형</label>
                <div className="p-3 bg-gray-50 rounded border">
                  {member.signupType}
                </div>
              </div>

              <div className="flex flex-col">
                <label className="font-semibold text-gray-700 mb-1">회원 상태</label>
                <select
                  value={memberState}
                  onChange={(e) => setMemberState(e.target.value)}
                  className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="INACTIVE">INACTIVE</option>
                  <option value="BLOCKED">BLOCKED</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* 버튼 그룹 */}
        <div className="w-full flex justify-center gap-3">
          <button
            onClick={handleClickList}
            className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
          >
            목록
          </button>
          <button
            onClick={handleUpdateState}
            className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
          >
            수정
          </button>
          <button
            onClick={handlePrint}
            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            출력
          </button>
        </div>
      </div>
    </div>
  );
};

export default MemberReadComponent;