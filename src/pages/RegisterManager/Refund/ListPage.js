import ListComponent from "../../../components/RegisterManager/Refund/ListComponent";

// 환불 목록 페이지
const RefundListPage = () => {
    return (
        <div className="p-4 w-full bg-white">
            <div className="text-3xl font-extrabold">환불 목록 페이지</div>
            <ListComponent/>
        </div>
    );
}

export default RefundListPage;