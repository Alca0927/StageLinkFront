import BasicLayout from "../layouts/BasicLayout";

const MainPage = () => {
  return (
    <BasicLayout hideSidebar={true}>
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Main Page</h1>
        <p className="text-lg">Welcome Admin</p>
      </div>
    </BasicLayout>
  );
};

export default MainPage;
