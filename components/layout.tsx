import Link from "next/link";
import { useRouter } from "next/router";
import SideBarItem from "./SidebarItem";
import { ISidebarItem } from "./types";
import { FaFolder, FaHome, FaUserClock } from "react-icons/fa";
import { BsFillKanbanFill, BsFillTicketDetailedFill } from "react-icons/bs";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Esto es el navabar que aparece siempre !!!! .
export default function Layout({ children }: { children: any }) {
  const menuItems: ISidebarItem[] = [
    {
      href: "/",
      icon: FaHome,
      title: "Inicio",
    },
    /*{
      href: "/clientes",
      icon: FaUsers,
    },
    {
      href: "/usuarios",
      icon: FaUser,
    },*/
    {
      href: "/proyectos",
      icon: BsFillKanbanFill,
      title: "Proyectos",
    },
    {
      href: "/Soporte/soporte",
      icon: BsFillTicketDetailedFill,
      title: "Soporte",
    },
    {
      href: "/recursos",
      icon: FaUserClock,
      title: "Recursos",
    },
  ];

  return (
    <div className="min-vh-100 d-flex flex-col bg-white">
      <header className="bg-black sticky top-0 h-14 flex justify-center items-center font-semibold uppercase text-white">
        PSA
      </header>
      <div className="flex-grow-1 d-flex overflow-auto">
        <div className="bg-gray-400 w-auto">
          <nav>
            <ul>
              {menuItems.map((item) => (
                <SideBarItem {...item} key={item.href} />
              ))}
            </ul>
          </nav>
        </div>
        <main className="flex-grow-1 overflow-auto">{children}</main>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
