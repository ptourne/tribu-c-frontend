import React, { useState, useEffect } from "react";
import { Proyecto } from "../pages/types";
import { AiOutlineCheck, AiOutlineCheckCircle } from "react-icons/ai";
import { IoIosWarning } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { Turret_Road } from "next/font/google";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Typography, Tooltip } from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button, Modal } from "react-bootstrap";

interface ProjectSideBarProps {
  project: Proyecto | undefined;
}

const ADD = 0;
const EDIT = 1;

function ProjectSideBarDetailsPane({ project }: ProjectSideBarProps) {
  const [mode, setMode] = useState(EDIT);

  const [pendingChanges, setPendingChanges] = useState(false);
  const [name, setName] = useState("");
  const [nameSaved, setNameSaved] = useState(true);
  const [state, setState] = useState("");
  const [stateSaved, setStateSaved] = useState(true);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [startDateSaved, setStartDateSaved] = useState(true);
  const [finishDate, setFinishDate] = useState<Date | null>(null);
  const [finishDateSaved, setFinishDateSaved] = useState(true);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  useEffect(() => {
    if (project) {
      setMode(EDIT);
      setName(project.nombre || "");
      setState(project.estado || "");
      setStartDate(project.fecha_inicio || null);
      setFinishDate(project.fecha_fin || null);
    } else {
      setMode(ADD);
      setName("Nuevo Proyecto");
      setState("En curso");
      setStartDate(null);
      setFinishDate(null);
    }
    if (pendingChanges) {
      toast.warning(
        project
          ? "Se descartaron los cambios de " + project.nombre
          : "Se descartaron los cambios",
        {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
        }
      );
    }
    setNameSaved(true);
    setStateSaved(true);
    setStartDateSaved(true);
    setFinishDateSaved(true);
    setPendingChanges(false);
  }, [project]);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    if (mode === EDIT) setNameSaved(false);
    setPendingChanges(true);
  };

  const handleStateChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setState(event.target.value);
    if (mode === EDIT) setStateSaved(false);
    setPendingChanges(true);
  };

  const handleStartDateChange = (date: Date) => {
    setStartDate(date);
    if (mode === EDIT) setStartDateSaved(false);
    setPendingChanges(true);
  };

  const handleFinishDateChange = (date: Date) => {
    setFinishDate(date);
    if (mode === EDIT) setFinishDateSaved(false);
    setPendingChanges(true);
  };

  const handleSave = () => {
    // Create an object with the updated values
    const updatedProject = {
      id: project?.id,
      nombre: name,
      estado: state,
    };

    // Make an API request to save the changes
    // ...

    if (true /*guardados correctamente*/) {
      toast.success(mode === EDIT ? "Cambios guardados correctamente!" : "Proyecto guardado correctamente!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
      });
      setNameSaved(true);
      setStateSaved(true);
      setStartDateSaved(true);
      setFinishDateSaved(true);
      setPendingChanges(false);
    }
  };

  const handleDeleteProject = () => {
    //Llamar API
    setShowDeleteConfirmation(false);
    if (true /*eliminado correctamente*/) {
      toast.success("Proyecto eliminado correctamente.", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
      });

      if (project) {
        setName(project.nombre || "");
        setState(project.estado || "");
        setStartDate(project.fecha_inicio || null);
        setFinishDate(project.fecha_fin || null);
        setNameSaved(true);
        setStateSaved(true);
        setStartDateSaved(true);
        setFinishDateSaved(true);
        setPendingChanges(false);
      }
    }
  };

  const handleDeleteConfirmationOpen = () => {
    setShowDeleteConfirmation(true);
  };

  const handleDeleteConfirmationClose = () => {
    setShowDeleteConfirmation(false);
  };

  return (
    <>
      <div>
        <form className="d-flex flex-col">
          <div className="d-flex justify-content-between align-items-center flex-row mt-1 mb-2">
            <div className="w-10 fs-2 text-body-secondary flex-shrink-0 ml-2 mr-2">
              {project && project.id}
            </div>
            <div className="">
              <input
                type="text"
                className="form-control border-0 border-bottom rounded-0 p-0 fs-2"
                id="name"
                value={name}
                onChange={handleNameChange}
              />
            </div>
            <div className="d-flex align-items-center justify-content-center flex-shrink-0 w-10 ml-3 mr-3">
              {nameSaved || (
                <Tooltip
                  title={
                    <Typography fontSize={15}>Cambios sin guardar</Typography>
                  }
                  placement="top"
                >
                  <div className="d-flex align-items-center justify-content-center text-warning">
                    <IoIosWarning
                      style={{ flex: "1", height: "100%", fontSize: "2rem" }}
                    />
                  </div>
                </Tooltip>
              )}
            </div>
            { mode === EDIT &&
            <button
              type="button"
              className="btn btn-lg btn-outline-danger d-flex align-items-center justify-content-center"
              onClick={() => {
                setShowDeleteConfirmation(true);
              }}
            >
              <MdDelete />
            </button>}
          </div>
          <div className="d-flex justify-content-between flex-col mt-1 mb-3">
            <div className="d-flex justify-content-between align-items-center flex-row">
              <div className="flex-grow-1 d-flex justify-content-between align-items-center flex-row">
                <label htmlFor="state" className="col-md-6 form-label">
                  Estado
                </label>
                <div className="col-md-6">
                  <select
                    className="form-select border-0 border-bottom rounded-0 p-0"
                    id="inputGroupSelect01"
                    value={state}
                    onChange={handleStateChange}
                  >
                    <option value="En curso">En curso</option>
                    <option value="Finalizado">Finalizado</option>
                  </select>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-center flex-shrink-0 w-10">
                {stateSaved || (
                  <Tooltip
                    title={
                      <Typography fontSize={15}>Cambios sin guardar</Typography>
                    }
                    placement="top"
                  >
                    <div className="d-flex align-items-center justify-content-center text-warning">
                      <IoIosWarning
                        style={{ flex: "1", height: "100%", fontSize: "2rem" }}
                      />
                    </div>
                  </Tooltip>
                )}
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center flex-row">
              <div className="flex-grow-1 d-flex justify-content-between align-items-center flex-row">
                <label htmlFor="startDate" className="col-md-6 form-label">
                  Fecha de Inicio
                </label>
                <div className="col-md-6">
                  <DatePicker
                    selected={startDate}
                    onChange={handleStartDateChange}
                    className="form-control border-0 border-bottom rounded-0 p-0"
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Seleccione una fecha"
                  />
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-center flex-shrink-0 w-10">
                {startDateSaved || (
                  <Tooltip
                    title={
                      <Typography fontSize={15}>Cambios sin guardar</Typography>
                    }
                    placement="top"
                  >
                    <div className="d-flex align-items-center justify-content-center text-warning">
                      <IoIosWarning
                        style={{ flex: "1", height: "100%", fontSize: "2rem" }}
                      />
                    </div>
                  </Tooltip>
                )}
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center flex-row">
              <div className="flex-grow-1 d-flex justify-content-between align-items-center flex-row">
                <label htmlFor="finishDate" className="col-md-6 form-label">
                  Fecha de Finalización
                </label>
                <div className="col-md-6">
                  <DatePicker
                    selected={finishDate}
                    onChange={handleFinishDateChange}
                    className="form-control border-0 border-bottom rounded-0 p-0"
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Seleccione una fecha"
                  />
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-center flex-shrink-0 w-10">
                {finishDateSaved || (
                  <Tooltip
                    title={
                      <Typography fontSize={15}>Cambios sin guardar</Typography>
                    }
                    placement="top"
                  >
                    <div className="d-flex align-items-center justify-content-center text-warning">
                      <IoIosWarning
                        style={{ flex: "1", height: "100%", fontSize: "2rem" }}
                      />
                    </div>
                  </Tooltip>
                )}
              </div>
            </div>
          </div>
          <button
            type="button"
            className={
              pendingChanges ? "btn btn-primary" : "btn btn-primary disabled"
            }
            onClick={handleSave}
          >
            { mode === EDIT ? "Guardar cambios" : "Guardar"}
          </button>
        </form>
      </div>
      <Modal
        show={showDeleteConfirmation}
        onHide={handleDeleteConfirmationClose}
      >
        <Modal.Header closeButton className="bg-danger text-white">
          <Modal.Title>Eliminar proyecto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            ¿Estás seguro que quieres eliminar
            {project
              ? ' el proyecto "' + project.nombre + '"'
              : " este proyecto"}
            ?
          </p>
          <p>
            Esta acción no puede ser revertida y perderás todo el trabajo y las
            tareas relacionadas.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteConfirmationClose}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleDeleteProject}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ProjectSideBarDetailsPane;
