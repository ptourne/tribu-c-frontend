import { SetStateAction, useEffect, useState } from "react";
import Popup from "./popup";
import { Tarea } from "../../types";
 
import {   FaSistrix,FaSearchengin,FaPencilAlt, FaUserClock } from "react-icons/fa";
import { BloqueDeTrabajo } from "@/pages/types";
import { SERVER_NAME_PROYECTOS } from "@/environments";
interface TarjetaTarea {
  bloqueDeTrabajo: BloqueDeTrabajo,
}
export const TarjetaTarea: React.FC<TarjetaTarea> = ({ bloqueDeTrabajo }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tipoBoton, setTipoBoton] = useState("guardar");   
  const [horas , setHoras] = useState(bloqueDeTrabajo.horasDelBloque);
  const [tareaAsociada, setTareaAsociada] = useState<Tarea>({
    id_tarea: "",
    id_project: "",
    titulo: "",
    descripcion: "",
    tiempo_estimado_fin: 0,
    horas_acumuladas: 0,
    estado: 0,
    responsable: ""
  });
  const [classNameDiv, setClassNameDiv] = useState("");
  const [classNameInput, setClassNameInput] = useState("");

  // Esto abre el popup
  const togglePopup = () => {
    if (!isOpen)
      setIsOpen(true);
  }
  const getTareasDeProyecto = async () => {
    try {
      const response = await fetch(
        SERVER_NAME_PROYECTOS + "projects/" + bloqueDeTrabajo.codProyectoDeLaTarea + "/tasks"
      );

      response.json().then((data) => {
        let x = data.msg;
        x.forEach((tarea: Tarea) => {
          if (tarea.id_tarea == bloqueDeTrabajo.codTarea.toString() && tarea.id_proyecto == bloqueDeTrabajo.codProyectoDeLaTarea.toString()) {
            setTareaAsociada(tarea);
            setClassNameDiv("d-flex flex-column  border-2 border-dark rounded-2 bd-highlight mb-3 align-items-center " + colorDeTarea(tareaAsociada.estado));
            setClassNameInput("form-control border-0 rounded-0 p-1 " + colorDeTarea(tareaAsociada.estado));
        } 
        })
      });
    } catch (error) {
      console.error("Error fetching ticket:", error);
    }
  };
  // Esto es para cargar en la variable horas el input del user
  const handleCambioDeHoras = (event: React.ChangeEvent<HTMLInputElement>) => {
    let number = parseInt(event.target.value)
    if (isNaN(number)) {
      number = 0;
    }
    setHoras(number);
  };

  // Evento del click del botón
  const handleClick = () => {
    //
    // TODO: Acá se debe llamar a un endpoint
    //
    //alert("Las horas cargadas son: " + horas);
     
    setIsOpen(false);
  }
  useEffect(() => {
    console.log("1er useff");
    getTareasDeProyecto();
  }, []);
  // Acá las classnames las pongo por fuera para poder marcar el color correspondiente de la tarea (A menos que se quiera estilizar más no debería ser necesario tocar esto)

  return <div>
    {
      ""
    }
    <div onClick={togglePopup} className= {classNameDiv}  style={estilos.filas}>
    {!isOpen ?  
       
       <  FaSearchengin /> :    <></>
      }   
      
      { tareaAsociada.titulo }  
    {
      isOpen && <Popup
        content={<>
          <div className="flex-grow-1 d-flex justify-content-between align-items-center flex-row ml-1">
            <label className="col-md-6 form-label align-items-center">
              Horas aplicadas
            </label>
            <div className="col-md-6">
              <input
                type= "text"
                className={classNameInput}
                id= "horas"
                value= { horas }
                 
                onChange=   { handleCambioDeHoras }    
                maxLength={4}
              />
          </div>
        </div>
        <div  className="d-flex justify-content-evenly">

        <div onClick= { handleClick } className="d-flex flex-column border-2 border-dark rounded-2 mw-100 ps-3 pe-3 mb-3 mt-2 mx-1  align-items-center ">
           guardar
        </div>
        <div onClick= { handleClick } className="d-flex flex-column border-2  border-dark rounded-2  ps-3 pe-3 mb-3 mt-2 mx-1 align-items-center ">
          ocultar
        </div>
        
        </div>
        
         
        </>}
      />
    }
    
    </div>
  </div>
}


function colorDeTarea(estadoTarea: number) {
  switch(estadoTarea) {
    case 0:
      console.log("Entra en 0");
      return "bg-warning"
    case 1:
      console.log("Entra en 1");
      return "bg-info"
    case 2:
      console.log("Entra en 2");
      return "bg-success"
    default:
      console.log("Entra en default");
      return;
  }
}
const estilos = {
  filas: {
    margin: "10px",
  }
};
