import { UserInfo } from "./_components/UserInfo";

const AdminHeader = () => {
  return (
    <header className="flex justify-between h-15 border-b py-3.5 font-bold text-secondary text-lg px-5">
      <h1>Монголын Автомажуулалтын Нийгэмлэг</h1>
      <div className="shrink-0">
        <UserInfo />
      </div>
    </header>
  );
};

export default AdminHeader;
