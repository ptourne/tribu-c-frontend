import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';

export default function Tareas() {
    const router = useRouter();
    const [projectId, setProjectId] = useState()

    useEffect(() => {
        const { projectId } = router.query;
        setProjectId(projectId);
    }, []);
  
    return (
      <div className="flex flex-row h-full">
      <div className="flex flex-fill col-md-1 h-full flex-col p-4 bg-white w-30">
        <div className="flex">
          <h1 className="text-black mb-5 font-bold">Proyecto {projectId} - Tareas</h1> 
        </div>
      </div>
    </div>
    );
  }
  