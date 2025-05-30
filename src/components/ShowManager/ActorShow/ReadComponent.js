import { useEffect, useState } from "react";
import { getOne } from "../../../api/actorShowApi";
import useCustomMove from "../../../hooks/useCustomMove";

const initState = {
  actorDTO: {
    actorNo: 0,
    actorName: "",
    actorImage: "",
    actorProfile: ""
  },
  showInfoDTO: {
    showInfo: 0,
    showName: "",
    showCategory: "",
    showExplain: ""
  },
  roleName: "",
  showStartTime: "",
  showEndTime: ""
};

const ReadComponent = ({ actorNo, showInfoId }) => {
  const [actorShow, setActorShow] = useState(initState);
  const { moveToList, moveToModify } = useCustomMove();

  useEffect(() => {
    if (actorNo !== undefined && showInfoId !== undefined) {
      getOne(actorNo, showInfoId)
        .then(data => {
          setActorShow(data);
        })
        .catch(error => {
          console.error("배우 출연작 정보 로드 실패:", error);
          alert("배우 출연작 정보를 불러오는데 실패했습니다.");
        });
    }
  }, [actorNo, showInfoId]);

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow-md rounded-lg p-8 border border-gray-300">
      <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">배우 출연작 상세정보</h2>

      {/* 배우 정보 */}
      <h3 className="text-lg font-semibold mb-4 text-blue-600 border-b pb-2">배우 정보</h3>
      {makeEditableDiv("배우 번호", actorShow.actorDTO.actorNo, true)}
      {makeEditableDiv("배우명", actorShow.actorDTO.actorName, true)}
      {makeEditableDiv("배우 프로필", actorShow.actorDTO.actorProfile, true)}

      {/* 공연 정보 */}
      <h3 className="text-lg font-semibold mt-10 mb-4 text-green-600 border-b pb-2">공연 정보</h3>
      {makeEditableDiv("공연 번호", actorShow.showInfoDTO.showInfo, true)}
      {makeEditableDiv("공연명", actorShow.showInfoDTO.showName, true)}
      {makeEditableDiv("공연 카테고리", actorShow.showInfoDTO.showCategory, true)}
      {makeEditableDiv("공연 설명", actorShow.showInfoDTO.showExplain, true)}

      {/* 출연 정보 */}
      <h3 className="text-lg font-semibold mt-10 mb-4 text-purple-600 border-b pb-2">출연 정보</h3>
      {makeEditableDiv("배역명", actorShow.roleName, true)}
      {makeEditableDiv("출연 시작일", actorShow.showStartTime, true)}
      {makeEditableDiv("출연 종료일", actorShow.showEndTime, true)}

      {actorShow.showStartTime && actorShow.showEndTime &&
        makeEditableDiv("출연 기간", `${actorShow.showStartTime} ~ ${actorShow.showEndTime}`, true)
      }

      {/* 버튼 */}
      <div className="flex justify-end space-x-4 mt-10">
        <button
          type="button"
          className="px-6 py-2 bg-gray-400 hover:bg-gray-500 text-white font-semibold rounded"
          onClick={() => moveToList(null, "actorshow")}
        >
          목록
        </button>
        <button
          type="button"
          className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded"
          onClick={() => moveToModify(`${actorShow.actorDTO.actorNo}/${actorShow.showInfoDTO.showInfo}`, "actorshow")}
        >
          수정
        </button>
      </div>
    </div>
  );
};

const makeEditableDiv = (title, value, readOnly = false, onChange) => (
  <div className="flex items-center py-4 border-b">
    <div className="w-1/4 text-right pr-4 font-bold text-gray-700">{title}</div>
    <input
      type="text"
      value={value}
      readOnly={readOnly}
      onChange={onChange}
      className={`w-3/4 bg-${readOnly ? "gray-100" : "white"} p-3 rounded shadow-sm text-gray-900 font-medium border border-gray-300`}
    />
  </div>
);

export default ReadComponent;
