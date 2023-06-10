import React from 'react'
import { Proyecto } from '@/pages/types'

const ProjectInfoCard = ({project}: {project: Proyecto}) => {
  return (
    <div className="h-20 p-1 border-solid border-2 border-black rounded">{project.nombre}</div>
  )
}

export default ProjectInfoCard