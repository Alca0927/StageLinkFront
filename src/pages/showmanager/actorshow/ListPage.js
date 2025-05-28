import ListComponent from "../../../components/ShowManager/ActorShow/ListComponent";

const ActorShowListPage = () => {
  return (
    <div className="p-4 w-full bg-white">
      <div className="text-3xl font-extrabold mb-6">배우-공연 목록</div>
    //<div className="flex right-10" onClick={() => moveToAdd("actorshow")}>추가</div>
      <ListComponent />
    </div>
  );
};

export default ActorShowListPage;