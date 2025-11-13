import { Outlet } from "react-router";
import Sidebar from "./Sidebar";

export default function CustomLayout() {
  return (
    <div className="flex w-full h-[100vh]">
      <Sidebar></Sidebar>
      <div className="p-4 w-full">
        <Outlet></Outlet>
      </div>
    </div>
  );
}
