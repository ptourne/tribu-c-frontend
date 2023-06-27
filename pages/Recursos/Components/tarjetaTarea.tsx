import { useState } from "react";
import Popup from "./popup";
import { number } from "prop-types";
import { setHttpClientAndAgentOptions } from "next/dist/server/config";
import { red } from "@mui/material/colors";
const estilos = {
  filas: {
    margin: "10px",
  }
};
export default function TarjetaTarea({nombreTarea, estadoTarea}) {
  const [isOpen, setIsOpen] = useState(false);
  const [horas , setHoras] = useState(0);
  const togglePopup = () => {
    if (!isOpen)
      setIsOpen(true);
  }

  const handleCambioDeHoras = (event: React.ChangeEvent<HTMLInputElement>) => {
    let number = parseInt(event.target.value)
    if (isNaN(number)) {
      number = 0;
    }
    setHoras(number);
  };

  const handleClick = () => {
    // Endpoint here
    alert("Horas" + horas);
  }

  const classNameDiv = "d-flex flex-column  border-2 border-dark rounded-2 bd-highlight mb-3 align-items-center " + colorDeTarea(estadoTarea);
  const classNameInput = "form-control border-0 rounded-0 p-1 " + colorDeTarea(estadoTarea);
  return <div>
    <div onClick={togglePopup} className= {classNameDiv}  style={estilos.filas}>
      { nombreTarea }
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
                onChange= {handleCambioDeHoras}
                maxLength={4}
              />
          </div>
        </div>
        <div className="d-flex flex-column border-2 border-dark rounded-2 mb-3 mt-2 mx-10 align-items-center ">
          <button onClick= { handleClick }>Editar</button>
        </div>
        </>}
        handleClose={handleClick}
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
