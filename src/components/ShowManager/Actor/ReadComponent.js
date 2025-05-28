import { useEffect, useState } from "react";
import { getOne, putOne } from "../../../api/actorApi";
import useCustomMove from "../../../hooks/useCustomMove";

const initState = {
  actorNo: 0,
  actorImage: "",
  actorName: "",
  actorProfile: ""
};

const ReadComponent = ({ actorNo }) => {
  const [actor, setActor] = useState(initState);
  const [imageFile, setImageFile] = useState(null);
  const { moveToList } = useCustomMove();

  useEffect(() => {
    getOne(actorNo).then(data => {
      setActor(data);
    });
  }, [actorNo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setActor(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setActor(prev => ({ ...prev, actorImage: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleModify = async () => {
    try {
      const formData = new FormData();
      formData.append("actorNo", actor.actorNo);
      formData.append("actorName", actor.actorName);
      formData.append("actorProfile", actor.actorProfile);
      if (imageFile) {
        formData.append("actorImage", imageFile);
      }

      await putOne(formData);
      alert("수정이 완료되었습니다.");
      moveToList(null, "actor");
    } catch (e) {
      console.error(e);
      alert("수정 실패");
    }
  };

  return (
    <div className="w-full flex justify-center mt-10">
      <div className="flex flex-col bg-white shadow-md rounded-lg border border-gray-200 p-8 text-base w-full max-w-5xl">
        <h2 className="text-2xl font-bold text-gray-700 text-center mb-6">배우 정보</h2>

        <div className="flex gap-10">
          {/* 이미지 영역 */}
          <div className="w-72 aspect-[3/4] overflow-hidden rounded-lg shadow relative">
            {actor.actorImage ? (
              <img 
                src={actor.actorImage} 
                alt={actor.actorName} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                이미지 없음
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="absolute bottom-0 left-0 w-full text-xs p-1 bg-white bg-opacity-80"
            />
          </div>

          {/* 텍스트 영역 */}
          <div className="flex flex-col justify-between max-w-md w-full space-y-4">
            <div className="space-y-4">
              {makeEditable("번호", actor.actorNo, true)}
              {makeEditable("이름", actor.actorName, false, "actorName", handleChange)}
              {makeEditable("프로필", actor.actorProfile, false, "actorProfile", handleChange, true)}
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <button 
                className="px-5 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                onClick={() => moveToList(null, "actor")}
              >
                목록
              </button>
              <button 
                className="px-5 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={handleModify}
              >
                수정
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const makeEditable = (label, content, readOnly, name, onChange, isTextarea) => (
  <div className="flex flex-col text-sm mb-1">
    <label className="font-medium text-gray-600 mb-1">{label}:</label>
    {readOnly ? (
      <span className="text-gray-800">{content}</span>
    ) : isTextarea ? (
      <textarea
        name={name}
        value={content}
        onChange={onChange}
        rows={6}
        className="border rounded p-3 text-gray-900 w-full"
      />
    ) : (
      <input
        type="text"
        name={name}
        value={content}
        onChange={onChange}
        className="border rounded p-3 text-gray-900 w-full"
      />
    )}
  </div>
);

export default ReadComponent;
