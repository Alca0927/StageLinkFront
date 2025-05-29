import { useEffect, useState } from "react";
import { getOne, putOne } from "../../../api/showLocationApi";
import useCustomMove from "../../../hooks/useCustomMove";

const initState = {
  showlocation: 0,
  facilityId: "",
  locationName: "",
  locationAddress: ""
};

const ReadComponent = ({ showlocation }) => {
  const [location, setLocation] = useState(initState);
  const { moveToList } = useCustomMove();

  useEffect(() => {
    if (showlocation) {
      getOne(showlocation)
        .then(data => setLocation(data))
        .catch(error => {
          console.error("Error fetching location:", error);
        });
    }
  }, [showlocation]);

  const handleChange = (field) => (e) => {
    setLocation(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleModify = async () => {
    try {
      await putOne(location); // ✅ DB 수정 요청
      alert("수정이 완료되었습니다.");
      moveToList(null, "location");
    } catch (error) {
      console.error("Update failed:", error);
      alert("수정 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow-md rounded-lg p-8 border border-gray-300">
      <h2 className="text-2xl font-bold text-blue-600 mb-6">Location Details</h2>

      {makeEditableDiv("showLocation", location.showlocation, true)}
      {makeEditableDiv("facilityId", location.facilityId, true)}
      {makeEditableDiv("locationName", location.locationName, false, handleChange("locationName"))}
      {makeEditableDiv("locationAddress", location.locationAddress, false, handleChange("locationAddress"))}

      <div className="flex justify-end space-x-4 mt-10">
        <button
          type="button"
          className="px-6 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded"
          onClick={() => moveToList(null, "location")}
        >
          목록
        </button>
        <button
          type="button"
          className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded"
          onClick={handleModify}
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
