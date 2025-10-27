import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const HomeLayout = () => {
  return (
    <div className="min-h-dvh flex flex-col bg-slate-50 font-sans">
      <Header />
      <main className="flex-1 pt-[68px]">
        <Outlet />
      </main>
      <footer className="p-6 text-center text-sm text-gray-500 bg-slate-100 border-t border-slate-200">
        푸터
      </footer>
    </div>
  );
};

export default HomeLayout;