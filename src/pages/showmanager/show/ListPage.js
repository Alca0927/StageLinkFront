import ListComponent from "../../../components/ShowManager/Show/ListComponent";
import useCustomMove from "../../../hooks/useCustomMove"

const ShowListPage = () => {
    const { moveToAdd } = useCustomMove();

    return (
        <div className="p-4 w-full bg-white">
            <div className="text-3xl font-extrabold">Show List Page</div>
            <div className="flex right-10" onClick={() => moveToAdd("show")}>추가</div>
            <ListComponent/>
        </div>
    );
}

export default ShowListPage;