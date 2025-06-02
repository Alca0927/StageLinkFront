import ListComponent from "../../../components/NoticeManager/QnAs/ListComponent";

// Q&A 목록 페이지
const QnAListPage = () => {
    return (
        <div className="p-4 w-full bg-white">
            <div className="text-3xl font-extrabold">Q&A 목록 페이지</div>
            <ListComponent/>
        </div>
    );
}

export default QnAListPage;