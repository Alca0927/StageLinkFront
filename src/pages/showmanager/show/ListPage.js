import ListComponent from "../../../components/ShowManager/Show/ListComponent";

// 공연 목록 페이지
const ShowListPage = () => {
  return (
    <div className="p-4 w-full bg-white">
      <div className="text-3xl font-extrabold mb-6">공연 목록 페이지</div>
      <ListComponent />
    </div>
  );
};

export default ShowListPage;
