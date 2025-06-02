import ListComponent from "../../../components/ShowManager/Location/ListComponent";

// 장소 목록 페이지
const LocationListPage = () => {
    return (
        <div className="p-4 w-full bg-white">
            <div className="text-3xl font-extrabold">장소 목록 페이지</div>
            <ListComponent/>
        </div>
    );
}

export default LocationListPage;