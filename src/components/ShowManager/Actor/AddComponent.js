import { useState } from "react";
import { postAdd } from "../../../api/actorApi";
import ResultModal from "../../common/ResultModal";
import useCustomMove from "../../../hooks/useCustomMove";
import uploadToCloudinary from "../../../util/uploadToCloudinary";

const initState = {
  actorNo: 0,
  actorImage: "",
  actorName: "",
  actorProfile: ""
};

const AddComponent = () => {
  const [actor, setActor] = useState({ ...initState });
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [result, setResult] = useState(null);
  const { moveToList } = useCustomMove();

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
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAdd = async () => {
    try {
      let imageUrl = "";

      if (imageFile) {
        try {
          console.log("📤 Cloudinary에 이미지 업로드 중...");
          imageUrl = await uploadToCloudinary(imageFile);
          console.log("✅ Cloudinary 업로드 성공:", imageUrl);
        } catch (uploadErr) {
          console.error("❌ Cloudinary 업로드 실패:", uploadErr);
          alert("Cloudinary 업로드 실패: " + uploadErr.message);
          return;
        }
      }

      const newActor = {
        ...actor,
        actorImage: imageUrl,
      };

      const result = await postAdd(newActor);
      setResult(result.actorNo);
      setActor({ ...initState });
      setImageFile(null);
      setPreviewImage(null);
    } catch (e) {
      console.error("❌ 등록 실패:", e);
      alert("등록 실패: " + e.message);
    }
  };

  const closeModal = (pageParam) => {
    setResult(null);
    moveToList(pageParam, "actor");
  };

  return (
    <div className="w-full flex justify-center mt-10">
      {result !== null && (
        <ResultModal
          title="ADD RESULT"
          content={`New ${result} Added`}
          callbackFn={closeModal}
        />
      )}

      <div className="flex flex-col bg-white shadow-md rounded-lg border border-gray-200 p-8 text-base w-full max-w-5xl">
        <h2 className="text-2xl font-bold text-gray-700 text-center mb-6">배우 등록</h2>

        <div className="flex gap-10">
          {/* 이미지 영역 */}
          <div className="w-72 aspect-[3/4] overflow-hidden rounded-lg shadow relative">
            {previewImage ? (
              <img
                src={previewImage}
                alt="preview"
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
                className="px-5 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={handleAdd}
              >
                등록
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 🔁 입력창 재사용 함수 (ReadComponent와 동일)
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

export default AddComponent;
