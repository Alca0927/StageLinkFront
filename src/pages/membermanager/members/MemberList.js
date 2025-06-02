import ListComponent from "../../../components/MemberManager/Members/ListComponent";

// 회원 목록 페이지
const MemberListPage = () => {
    return (
        <div className="p-4 w-full bg-white">
            <div className="text-3xl font-extrabold">회원 목록 페이지</div>
            <ListComponent/>
        </div>
    );
}

export default MemberListPage;