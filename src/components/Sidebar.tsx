import { useState } from "react";
import { Link } from "react-router";

interface Nav {
  label: string;
  pathTo: string;
}
export default function Sidebar() {
  const [active, setActive] = useState("/");
  const navlinks: Nav[] = [
    { label: "Acceuil", pathTo: "/" },
    { label: "Stocks", pathTo: "/stocks" },
  ];
  return (
    <div className="h-full py-10  top-0 left-0 w-[20vw] flex flex-col items-start bg-white text-black">
      <header className=" px-4 py-5">My stock fishoo</header>
      <main className="w-full">
        <ul className="w-full flex flex-col justify-center items-start p-3 gap-4">
          {navlinks.map((nav) => (
            <li
              key={nav.label}
              className={`w-full ${
                active == nav.pathTo
                  ? "bg-[#00bfff65]"
                  : " hover:bg-[#00bfff18]"
              } `}
            >
              <Link className="" to={nav.pathTo}>
                <button onClick={()=>{setActive(nav.pathTo)}} className="w-full h-full  px-4 py-3 cursor-pointer">
                  {nav.label}
                </button>
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <footer className=""></footer>
    </div>
  );
}
