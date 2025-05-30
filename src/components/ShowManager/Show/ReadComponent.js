import { useEffect, useState } from "react";
import { getOne, putOne } from "../../../api/showApi";
import useCustomMove from "../../../hooks/useCustomMove";
import { getList as getShowInfoList } from "../../../api/showInfoApi";

const initState = {
  showNo: 0,
  showInfoDTO: { showInfo: 0, showName: "" },
  showStartTime: "",
  showEndTime: "",
  seatRPrice: 0,
  seatAPrice: 0,
  seatSPrice: 0,
  seatVipPrice: 0,
  seatRCount: 0,
  seatACount: 0,
  seatSCount: 0,
  seatVipCount: 0,
  showState: 0,
};

const ReadComponent = ({ showNo }) => {
  const [show, setShow] = useState(initState);
  const [originalShow, setOriginalShow] = useState(initState);
  const [showInfoList, setShowInfoList] = useState([]);
  const { moveToList } = useCustomMove();

  useEffect(() => {
    getOne(showNo)
      .then((data) => {
        setShow(data);
        setOriginalShow(data);
      })
      .catch((error) => {
        console.error("Error fetching Show:", error);
      });

    getShowInfoList({ page: 1, size: 100 })
      .then((data) => {
        if (Array.isArray(data.dtoList)) {
          setShowInfoList(data.dtoList);
        }
      })
      .catch((error) => {
        console.error("Error fetching showInfo list:", error);
      });
  }, [showNo]);

  const handleClickModify = () => {
    const requestData = {
      ...show,
      showInfoDTO: {
        ...show.showInfoDTO,
        showInfo: show.showInfoDTO.showInfo,
      },
    };

    putOne(requestData)
      .then(() => {
        alert("수정이 완료되었습니다.");
        moveToList(null, "show");
      })
      .catch((error) => {
        console.error("Update failed:", error);
        alert("수정 중 오류가 발생했습니다.");
      });
  };

  const handleChange = (field) => (e) => {
    setShow((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleShowInfoChange = (e) => {
    const selectedShowInfoId = e.target.value;
    const selected = showInfoList.find(
      (info) => info.showInfo == selectedShowInfoId
    );

    setShow((prev) => ({
      ...prev,
      showInfoDTO: {
        showInfo: selectedShowInfoId,
        showName: selected?.showName || "",
      },
    }));
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow-md rounded-lg p-8 border border-gray-300">
      <h2 className="text-2xl font-bold text-blue-600 mb-6">Show Details</h2>

      {makeEditableDiv("공연 번호", show.showNo, true)}
      {makeSelectDiv("공연 정보", show.showInfoDTO?.showInfo, handleShowInfoChange, showInfoList)}
      {makeEditableDiv("공연 시작 시간", show.showStartTime, false, handleChange("showStartTime"), "datetime-local")}
      {makeEditableDiv("공연 종료 시간", show.showEndTime, false, handleChange("showEndTime"), "datetime-local")}
      {makeEditableDiv("R석 가격", show.seatRPrice, false, handleChange("seatRPrice"))}
      {makeEditableDiv("A석 가격", show.seatAPrice, false, handleChange("seatAPrice"))}
      {makeEditableDiv("S석 가격", show.seatSPrice, false, handleChange("seatSPrice"))}
      {makeEditableDiv("VIP석 가격", show.seatVipPrice, false, handleChange("seatVipPrice"))}
      {makeEditableDiv("R석 갯수", show.seatRCount, false, handleChange("seatRCount"))}
      {makeEditableDiv("A석 갯수", show.seatACount, false, handleChange("seatACount"))}
      {makeEditableDiv("S석 갯수", show.seatSCount, false, handleChange("seatSCount"))}
      {makeEditableDiv("VIP석 갯수", show.seatVipCount, false, handleChange("seatVipCount"))}
      {makeEditableDiv("공연 상태", show.showState, false, handleChange("showState"))}

      <div className="flex justify-end space-x-4 mt-10">
        <button
          type="button"
          className="px-6 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded"
          onClick={() => moveToList(null, "show")}
        >
          목록
        </button>
        <button
          type="button"
          className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded"
          onClick={handleClickModify}
        >
          수정
        </button>
      </div>
    </div>
  );
};

// 💡 location 스타일과 동일하게 맞춘 입력 필드
const makeEditableDiv = (title, value, readOnly = false, onChange, type = "text") => (
  <div className="flex items-center py-4 border-b">
    <div className="w-1/4 text-right pr-4 font-bold text-gray-700">{title}</div>
    <input
      type={type}
      value={value || ""}
      readOnly={readOnly}
      onChange={onChange}
      className={`w-3/4 ${readOnly ? "bg-gray-100" : "bg-white"} p-3 rounded shadow-sm text-gray-900 font-medium border border-gray-300`}
    />
  </div>
);

// 💡 SelectBox (공연 정보)
const makeSelectDiv = (title, value, onChange, list) => (
  <div className="flex items-center py-4 border-b">
    <div className="w-1/4 text-right pr-4 font-bold text-gray-700">{title}</div>
    <select
      value={value}
      onChange={onChange}
      className="w-3/4 p-3 rounded shadow-sm text-gray-900 font-medium border border-gray-300 bg-white"
    >
      <option value="">공연 선택</option>
      {list.map((item) => (
        <option key={item.showInfo} value={item.showInfo}>
          {item.showName}
        </option>
      ))}
    </select>
  </div>
);

export default ReadComponent;
