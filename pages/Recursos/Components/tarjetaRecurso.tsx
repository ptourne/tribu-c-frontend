import TarjetaTarea from "./tarjetaTarea";
import { Recurso } from "../../types";
import Popup from "./popup";
import { useState } from "react";

interface TarjetaRecurso {
    recurso: Recurso;
}
export const TarjetaRecurso: React.FC<TarjetaRecurso> = ({ recurso }) => {
    const [isOpen, setIsOpen] = useState(false);
    const togglePopup = () => {
        if (!isOpen)
        setIsOpen(true);
    }
    const handleClick = () => {
        alert("Hii");
    }

    return (
        <>
            <div onClick={togglePopup} className="d-flex flex-column border-2 border-dark rounded-2 mb-3 mt-2 mx-3">
                <label className="my-2 ml-2">
                    {recurso.nombre}
                </label>
                {
                    isOpen && <Popup
                        content= {
                        <>
                            <div className="flex-grow-1 d-flex justify-content-between align-items-center flex-row ml-1">
                                <label className="col-md-6 form-label align-items-center">
                                    Horas aplicadas
                                </label>
                                <div className="col-md-6">
                                </div>
                            </div>
                            <div className="d-flex flex-column border-2 border-dark rounded-2 mb-3 mt-2 mx-10 align-items-center ">
                                <button onClick= { handleClick }>Editar</button>
                            </div>
                        </>
                    }
                    />
                }
            </div>
        </>
    )
}