import { useState } from "react";
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";

// 페이지, 사이즈 숫자 받기, 없으면 디폴트값 출력
const getNum = (param, defaultValue) => {
  if (!param) {
    return defaultValue;
  }
  return parseInt(param);
};

const useCustomMove = () => {
  const navigate = useNavigate();

  const [refresh, setRefresh] = useState(false);
  const [queryParams] = useSearchParams();

  const page = getNum(queryParams.get('page'), 1);
  const size = getNum(queryParams.get('size'), 10);
  const queryDefault = createSearchParams({ page, size }).toString();

  const moveToList = (pageParam, path) => {
    let queryStr = "";

    if (pageParam) {
      const pageNum = getNum(pageParam.page, page);
      const sizeNum = getNum(pageParam.size, size);
      queryStr = createSearchParams({ page: pageNum, size: sizeNum }).toString();
    } else {
      queryStr = queryDefault;
    }

    navigate({
      pathname: `../${path}/list`,
      search: queryStr,
    });
  };

  const moveToModify = (num, path) => {
    console.log(queryDefault);
    navigate({
      pathname: `../${path}/modify/${num}`,
      search: queryDefault, // 수정 시 기존 쿼리 스트링 유지
    });
  };

  const moveToRead = (num, path) => {
    if (num) {
      console.log("Navigating with:", num); // num 값 확인
      navigate({
        pathname: `../${path}/${num}`, // ✅ read 제거됨
        search: queryDefault,
      });
    } else {
      console.error("Invalid showlocation num:", num);
    }
  };

  const moveToAdd = (path) => {
    navigate({
      pathname: `../${path}/add`,
    });
  };

  return { moveToList, moveToModify, moveToRead, moveToAdd, page, size, refresh };
};

export default useCustomMove;
