import Link from "next/link"
import { useRouter } from "next/router"
import SideBarItem from "./SidebarItem"
import { ISidebarItem } from "./types"

export default function Layout({ children }: { children: any }) {
  const menuItems: ISidebarItem[] = [
    {
      href: "/",
      title: "Homepage",
    },
    /*{
      href: "/clientes",
      title: "Clientes",
    },
    {
      href: "/usuarios",
      title: "Usuarios",
    },*/
    {
      href: "/proyectos",
      title: "Proyectos",
    },
    {
      href: "/soporte",
      title: "Soporte",
    },
    {
      href: "/recursos",
      title: "Recursos",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="bg-black sticky top-0 h-14 flex justify-center items-center font-semibold uppercase text-white">
        PSA
      </header>
      <div className="flex flex-col md:flex-row flex-1">
        <aside className="bg-gray-400 w-full md:w-40">
          <nav>
            <ul>
              {menuItems.map((item) => (
                <SideBarItem {...item} key={item.title} />
              ))}
            </ul>
          </nav>
        </aside>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  )
}
