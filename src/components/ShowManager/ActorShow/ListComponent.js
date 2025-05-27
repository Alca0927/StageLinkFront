import { useEffect, useState } from "react";
import { getList } from "../../../api/actorShowApi";
import useCustomMove from "../../../hooks/useCustomMove";
import PageComponent from "../../common/PageComponent";

const initState = {
    dtoList: [],
    pageNumList: [],
    pageRequestDTO: null,
    prev: false,
    next: false,
    totalCount: 0,
    prevPage: 0,
    nextPage: 0,
    totalPage: 0,
    current: 0
}

const ListComponent = () => {
    const { page, size, refresh, moveToList, moveToRead } = useCustomMove();
    const [serverData, setServerData] = useState(initState);

    useEffect(() => {
        getList({ page, size }).then(data => {
            console.log("ActorShow List:", data);
            setServerData(data);
        });
    }, [page, size, refresh]);

    // movePage 함수를 제대로 정의
    const movePage = (pageParam) => {
        moveToList(pageParam, "reservation");
    }
    
    return (
        <div className="border-2 border-blue-100 mt-10 mr-2 ml-2">
            
            <div className="flex justify-center mb-6 pt-6">
                <h2 className="text-2xl font-bold">배우 출연작 목록</h2>
            </div>

            <div className="flex flex-wrap mx-auto justify-center p-6">
                {serverData.dtoList.map(actorShow =>
                    <div
                        key={`${actorShow.actorDTO.actorNo}_${actorShow.showInfoDTO.showInfo}`} 
                        className="w-full min-w-[400px] p-2 m-2 rounded shadow-md cursor-pointer hover:shadow-lg transition-shadow"
                        onClick={() => moveToRead(`${actorShow.actorDTO.actorNo}/${actorShow.showInfoDTO.showInfo}`, "actorshow")}
                    >  
                        <div className="flex items-center">
                            {/* 배우 번호 */}
                            <div className="font-extrabold text-lg p-2 w-1/12 text-center">
                                {actorShow.actorDTO.actorNo}
                            </div>
                            
                            {/* 배우명 */}
                            <div className="text-lg m-1 p-2 w-2/12 font-bold">
                                {actorShow.actorDTO.actorName}
                            </div>
                            
                            {/* 공연명 */}
                            <div className="text-lg m-1 p-2 w-3/12 font-semibold text-blue-600">
                                {actorShow.showInfoDTO.showName}
                            </div>
                            
                            {/* 배역명 */}
                            <div className="text-md m-1 p-2 w-2/12 font-medium text-purple-600">
                                {actorShow.roleName}
                            </div>
                            
                            {/* 출연 기간 */}
                            <div className="text-sm m-1 p-2 w-3/12 font-medium text-gray-600">
                                {actorShow.showStartTime && actorShow.showEndTime ? 
                                    `${actorShow.showStartTime} ~ ${actorShow.showEndTime}` :
                                    actorShow.showStartTime || actorShow.showEndTime || '미정'
                                }
                            </div>
                            
                            {/* 공연 카테고리 */}
                            <div className="text-sm m-1 p-2 w-1/12 font-medium text-green-600">
                                {actorShow.showInfoDTO.showCategory}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* 데이터가 없을 때 */}
            {serverData.dtoList.length === 0 && (
                <div className="flex justify-center items-center h-32">
                    <div className="text-xl text-gray-500">등록된 배우 출연작이 없습니다.</div>
                </div>
            )}

            <PageComponent 
                serverData={serverData} 
                movePage={(pageParam) => moveToList(pageParam, "actorshow")}
            />
        </div>
    );
}

export default ListComponent;