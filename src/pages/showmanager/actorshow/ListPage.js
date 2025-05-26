import ListComponent from "../../../components/ShowManager/ActorShow/ListComponent";
import useCustomMove from "../../../hooks/useCustomMove"

const ActorShowListPage = () => {
    const { moveToAdd } = useCustomMove();

    return (
        <div className="p-4 w-full bg-white">
            <div className="text-3xl font-extrabold">ActorShow List Page</div>
            <div className="flex right-10" onClick={() => moveToAdd("actor")}>추가</div>
            <ListComponent/>
        </div>
    );
}

export default ActorShowListPage;