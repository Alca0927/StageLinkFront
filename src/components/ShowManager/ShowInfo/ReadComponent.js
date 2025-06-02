import { useEffect, useState } from "react";
import { getOne, putOne } from "../../../api/showInfoApi";
import useCustomMove from "../../../hooks/useCustomMove";
import { getList as getLocationList } from "../../../api/showLocationApi";

const initState = {
  showInfo: 0,
  showPoster: "",
  showName: "",
  showExplain: "",
  showCategory: "",
  showAge: 0,
  showDuration: "",
  showLocationDTO: {
    showlocation: "",
    locationName: "",
  },
  showStyUrl1: "",
  showStyUrl2: "",
  showStyUrl3: "",
  showStyUrl4: "",
};

const ReadComponent = ({ showInfo }) => {
  const [showinfo, setShowInfo] = useState(initState);
  const [locationList, setLocationList] = useState([]);
  const { moveToList } = useCustomMove();

  useEffect(() => {
    getOne(showInfo)
      .then((data) => {
        setShowInfo(data);
      })
      .catch((error) => {
        console.error("Error fetching ShowInfo:", error);
      });

    getLocationList({ page: 1, size: 100 })
      .then((data) => {
        if (Array.isArray(data.dtoList)) {
          setLocationList(data.dtoList);
        } else {
          console.error("Expected array for locationList, got", data);
        }
      })
      .catch((error) => {
        console.error("Error fetching location list:", error);
      });
  }, [showInfo]);

  const handleClickModify = () => {
    const requestData = {
      ...showinfo,
      showLocationDTO: {
        showlocation: showinfo.showLocationDTO.showlocation,
        locationName: showinfo.showLocationDTO.locationName,
      },
    };

    putOne(requestData)
      .then(() => {
        alert("수정이 완료되었습니다.");
        moveToList(null, "showinfo");
      })
      .catch((error) => {
        console.error("Update failed:", error);
        alert("수정 중 오류가 발생했습니다.");
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShowInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLocationChange = (e) => {
    const selectedId = e.target.value;
    const selected = locationList.find((loc) => loc.showlocation == selectedId);
    setShowInfo((prev) => ({
      ...prev,
      showLocationDTO: {
        showlocation: selectedId,
        locationName: selected?.locationName || "",
      },
    }));
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow-md rounded-lg p-8 border border-gray-300">
      <h2 className="text-2xl font-bold text-blue-600 mb-6">공연 정보 상세</h2>

      {makeEditableDiv("공연 정보 ID", showinfo.showInfo, true)}
      {makeEditableDiv("공연 포스터", showinfo.showPoster, false, handleChange)}
      {makeEditableDiv("공연 명", showinfo.showName, false, handleChange)}
      {makeEditableDiv("공연 설명", showinfo.showExplain, false, handleChange)}
      {makeEditableDiv("공연 카테고리", showinfo.showCategory, false, handleChange)}
      {makeEditableDiv("연령 제한", showinfo.showAge, false, handleChange)}
      {makeEditableDiv("공연 시간", showinfo.showDuration, false, handleChange)}
      {makeSelectableDiv("장소 명", showinfo.showLocationDTO?.showlocation, false, handleLocationChange, locationList)}
      {makeEditableDiv("공연 이미지 1", showinfo.showStyUrl1, false, handleChange)}
      {makeEditableDiv("공연 이미지 2", showinfo.showStyUrl2, false, handleChange)}
      {makeEditableDiv("공연 이미지 3", showinfo.showStyUrl3, false, handleChange)}
      {makeEditableDiv("공연 이미지 4", showinfo.showStyUrl4, false, handleChange)}

      <div className="flex justify-end space-x-4 mt-10">
        <button
          type="button"
          className="px-6 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded"
          onClick={() => moveToList(null, "showinfo")}
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

// 📦 입력 필드 공통 구조
const makeEditableDiv = (title, value, readOnly = false, onChange) => (
  <div className="flex items-center py-4 border-b">
    <div className="w-1/4 text-right pr-4 font-bold text-gray-700">{title}</div>
    <input
      type="text"
      name={title}
      value={value || ""}
      readOnly={readOnly}
      onChange={onChange}
      className={`w-3/4 ${readOnly ? "bg-gray-100" : "bg-white"} p-3 rounded shadow-sm text-gray-900 font-medium border border-gray-300`}
    />
  </div>
);

// 📦 선택 필드 공통 구조
const makeSelectableDiv = (title, value, readOnly = false, onChange, list) => (
  <div className="flex items-center py-4 border-b">
    <div className="w-1/4 text-right pr-4 font-bold text-gray-700">{title}</div>
    <select
      name="showlocation"
      value={value || ""}
      disabled={readOnly}
      onChange={onChange}
      className="w-3/4 p-3 rounded border border-gray-300 shadow-sm bg-white"
    >
      <option value="">Select Location</option>
      {Array.isArray(list) &&
        list.map((item) => (
          <option key={item.showlocation} value={item.showlocation}>
            {item.locationName}
          </option>
        ))}
    </select>
  </div>
);

export default ReadComponent;
