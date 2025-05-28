import ListComponent from "../../../components/ShowManager/Actor/ListComponent";

const ActorListPage = () => {
  return (
    <div className="p-4 w-full bg-white">
      <div className="text-3xl font-extrabold mb-6">배우 목록</div>
      <ListComponent />
    </div>
  );
};

export default ActorListPage;
