import React from 'react'
import { Tarea } from '@/pages/types'

const TaskInfoCard = ({task}: {task: Tarea}) => {
  return (
    <div className="h-10 p-1 border-solid border-2 border-black">{task.titulo}</div>
  )
}

export default TaskInfoCard