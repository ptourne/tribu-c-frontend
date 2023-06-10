import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export default function Proyectos() {
  return (
    <div className="flex h-full flex-col justify-center items-center bg-white">
      <h1 className="text-4xl mb-5 font-bold">Proyectos</h1>
    </div>
  )
}