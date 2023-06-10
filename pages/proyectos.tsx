import { Inter } from "next/font/google"
import ProjectInfoCard from "@/components/projectInfoCard"
import React, { Fragment, useState, useEffect } from 'react'
import { Proyecto } from "./types"

const inter = Inter({ subsets: ["latin"] })

export default function Proyectos() {
  const [projects, setProjects] = useState<Proyecto[]>([])

  const getProjects = async () => {
    //Proyectos de prueba hasta que tengamos conexion con el back-end
    const projects: Proyecto[] = [
      {id: '1', nombre: 'Primer Proyecto', fecha_inicio: new Date(), fecha_fin: new Date(), estado: 'En curso', horas_consumidas: 15, costo_proyecto: 50000},
      {id: '2', nombre: 'Segundo Proyecto', fecha_inicio: new Date(), fecha_fin: new Date(), estado: 'En curso', horas_consumidas: 8, costo_proyecto: 70000},
      {id: '3', nombre: 'Tercer Proyecto', fecha_inicio: new Date(), fecha_fin: new Date(), estado: 'Finalizado', horas_consumidas: 40, costo_proyecto: 150000}]
    setProjects(projects)
  }

  useEffect(() => {
    getProjects()
  }, [])

  return (
    <div className="flex h-full flex-col p-4 bg-white">
      <h1 className="text-black text-4xl mb-20 font-bold">Proyectos</h1>
      <div className={projects.length > 0 ? 'flex h-full flex-col space-y-4 text-black' : 'text-black'}>
        {projects.length > 0
          ? projects.map((project, index) => <ProjectInfoCard key={index} project={project} />)
          : "No hay proyectos para mostrar"}
      </div>
    </div>
  )
}