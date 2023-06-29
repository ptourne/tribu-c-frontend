import { useState } from "react";
import Popup from "./popup";
import { Tarea } from "./types";
 
import {   FaSistrix,FaSearchengin,FaPencilAlt, FaUserClock } from "react-icons/fa";
interface TarjetaTarea {
  tarea: Tarea,
}
export const TarjetaTarea: React.FC<TarjetaTarea> = ({ tarea }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tipoBoton, setTipoBoton] = useState("guardar");
  const [horas , setHoras] = useState(tarea.horasDedicadas);

  // Esto abre el popup
  const togglePopup = () => {
    if (!isOpen)
      setIsOpen(true);
  }

  // Esto es para cargar en la variable horas el input del user
  const handleCambioDeHoras = (event: React.ChangeEvent<HTMLInputElement>) => {
    let number = parseInt(event.target.value)
    if (isNaN(number)) {
      number = 0;
    }
    setHoras(number);
  };

  // Evento del click del botón
  const handleClick = ( ) => {
    //
    // TODO: Acá se debe llamar a un endpoint
    //
    //alert("Las horas cargadas son: " + horas);
     
    setIsOpen(false);
  }

  // Acá las classnames las pongo por fuera para poder marcar el color correspondiente de la tarea (A menos que se quiera estilizar más no debería ser necesario tocar esto)
  const classNameDiv = "d-flex flex-column  border-2 border-dark rounded-2 bd-highlight mb-3 align-items-center " + colorDeTarea(tarea.estado);
  const classNameInput = "form-control border-0 rounded-0 p-1 " + colorDeTarea(tarea.estado);

  return <div>
    <div onClick={togglePopup} className= {classNameDiv}  style={estilos.filas}>
    {!isOpen ?  
       
       <  FaSearchengin /> :    <></>
      }   
      
      { tarea.titulo }  
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
      return "bg-warning"
    case 1:
      return "bg-info"
    case 2:
      return "bg-success"
  }
}

const estilos = {
  filas: {
    margin: "10px",
  }
};
