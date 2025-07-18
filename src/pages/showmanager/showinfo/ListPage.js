import ListComponent from "../../../components/ShowManager/ShowInfo/ListComponent";

// 공연 정보 목록 페이지
const ShowInfoListPage = () => {
    return (
        <div className="p-4 w-full bg-white">
            <div className="text-3xl font-extrabold">공연 정보 목록 페이지</div>
            <ListComponent/>
        </div>
    );
}

export default ShowInfoListPage;