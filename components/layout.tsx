import Link from "next/link";
import { useRouter } from "next/router";
import SideBarItem from "./SidebarItem";
import { ISidebarItem } from "./types";
import { FaFolder, FaHome, FaUserClock } from "react-icons/fa";
import { BsFillKanbanFill, BsFillTicketDetailedFill } from "react-icons/bs";

export default function Layout({ children }: { children: any }) {
  const menuItems: ISidebarItem[] = [
    {
      href: "/",
      icon: FaHome,
      title: 'Inicio'
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
      title: 'Proyectos'
    },
    {
      href: "/soporte",
      icon: BsFillTicketDetailedFill,
      title: 'Soporte'
    },
    {
      href: "/recursos",
      icon: FaUserClock,
      title: 'Recursos'
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="bg-black sticky top-0 h-14 flex justify-center items-center font-semibold uppercase text-white">
        PSA
      </header>
      <div className="flex flex-col md:flex-row flex-1">
        <aside className="bg-gray-400 w-full md:w-auto">
          <nav>
            <ul>
              {menuItems.map((item) => (
                <SideBarItem {...item} key={item.href} />
              ))}
            </ul>
          </nav>
        </aside>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
