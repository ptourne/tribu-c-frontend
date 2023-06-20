import React, { useState, useEffect } from "react";
import axios from 'axios'
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
import { SERVER_NAME_PROYECTOS } from "@/environments";

interface ProjectSideBarProps {
  project: Proyecto | undefined;
  getProjectsFunction: Function;
}

const ADD = 0;
const EDIT = 1;

function ProjectSideBarDetailsPane({ project, getProjectsFunction }: ProjectSideBarProps) {
  const [mode, setMode] = useState(EDIT);

  const [lastProject, setLastProject] = useState<Proyecto | undefined>(undefined);
  const [pendingChanges, setPendingChanges] = useState(false);
  const [name, setName] = useState("");
  const [nameSaved, setNameSaved] = useState(true);
  const [state, setState] = useState("");
  const [stateSaved, setStateSaved] = useState(true);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [startDateSaved, setStartDateSaved] = useState(true);
  const [finishDate, setFinishDate] = useState<Date | null>(null);
  const [finishDateSaved, setFinishDateSaved] = useState(true);
  const [estimatedCost, setEstimatedCost] = useState("");
  const [estimatedCostSaved, setEstimatedCostSaved] = useState(true);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  useEffect(() => {
    if (project) {
      setMode(EDIT);
      setName(project.nombre || "");
      setState(project.estado || "");
      setStartDate(project.fecha_inicio || null);
      setFinishDate(project.fecha_fin_estimada || null);
      setEstimatedCost(project.costo_estimado.toString());
      if (!lastProject) setLastProject(project)
    } else {
      setMode(ADD);
      setName("Nuevo Proyecto");
      setState("En curso");
      setStartDate(null);
      setFinishDate(null);
      setEstimatedCost("0");
    }
    if (pendingChanges) {
      toast.warning(
        project && lastProject
          ? "Se descartaron los cambios de " + lastProject.nombre
          : "Se descartaron los cambios",
        {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
        }
      );
    }
    setLastProject(project);
    setNameSaved(true);
    setStateSaved(true);
    setStartDateSaved(true);
    setFinishDateSaved(true);
    setEstimatedCostSaved(true);
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

  const handleEstimatedCostChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEstimatedCost(event.target.value);
    if (mode === EDIT) setEstimatedCostSaved(false);
    setPendingChanges(true);
  };

  const handleSave = () => {
    // Create an object with the updated values
    const projectToSave: Proyecto = {
      nombre: name,
      estado: state,
      costo_estimado: parseInt(estimatedCost),
      fecha_inicio: startDate,
      fecha_fin_estimada: finishDate,
      customizacion: "Custom FIUBA2",
      horas_consumidas: 5,
      id_cliente: 100,
      id_producto: 10,
      version: "1.9",
    };

    // Make an API request to save the changes

    if (mode === ADD) saveProject(projectToSave);
    else updateProject(projectToSave);
  };

  const saveProject = (projectToSave: Proyecto) => {
    axios
      .post(SERVER_NAME_PROYECTOS + 'projects', projectToSave)
      .then(() => {
        toast.success("Proyecto guardado correctamente!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
        });
        getProjectsFunction();
        setNameSaved(true);
        setStateSaved(true);
        setStartDateSaved(true);
        setFinishDateSaved(true);
        setEstimatedCostSaved(true);
        setPendingChanges(false);

        setName("Nuevo Proyecto");
        setState("En curso");
        setStartDate(null);
        setFinishDate(null);
        setEstimatedCost("0");
        
      })
      .catch((e) => {
        toast.error(e.response?.data?.msg ? "Hubo un error al guardar el proyecto: " + e.response?.data?.msg : "Hubo un error al guardar el proyecto", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
        });
      })
  }

  const updateProject = (projectToSave: Proyecto) => {
    axios
      .put(SERVER_NAME_PROYECTOS + `projects/${project?.codigo}`, projectToSave)
      .then(() => {
        toast.success("Cambios guardados correctamente!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
        });
        getProjectsFunction();
        setNameSaved(true);
        setStateSaved(true);
        setStartDateSaved(true);
        setFinishDateSaved(true);
        setEstimatedCostSaved(true);
        setPendingChanges(false);
      })
      .catch((e) => {
        toast.error(e.response?.data?.msg ? "Hubo un error al actualizar el proyecto: " + e.response?.data?.msg : "Hubo un error al actualizar el proyecto", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
        });
      })
  }

  const handleDeleteProject = () => {
    //Llamar API
    axios
      .delete(SERVER_NAME_PROYECTOS + `projects/${project?.codigo}`)
      .then(() => {
        setShowDeleteConfirmation(false);
        toast.success("Proyecto eliminado correctamente.", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
        });
  
        getProjectsFunction();
        setNameSaved(true);
        setStateSaved(true);
        setStartDateSaved(true);
        setFinishDateSaved(true);
        setEstimatedCostSaved(true);
        setPendingChanges(false);
  
        setName("Nuevo Proyecto");
        setState("En curso");
        setStartDate(null);
        setFinishDate(null);
        setEstimatedCost("0");
      })
      .catch((e) => {
        setShowDeleteConfirmation(false);
        toast.error(e.response?.data?.msg ? "Hubo un error al eliminar el proyecto: " + e.response?.data?.msg : "Hubo un error al eliminar el proyecto", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
        });
      })
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
              {project && project.codigo}
            </div>
            <div className="">
              <input
                type="text"
                className="form-control border-0 border-bottom rounded-0 p-0 fs-2"
                id="name"
                value={name}
                onChange={handleNameChange}
                maxLength={60}
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
                    maxDate={finishDate ? finishDate : null}
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
                    minDate={startDate ? startDate : null}
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
            <div className="d-flex justify-content-between align-items-center flex-row">
              <div className="flex-grow-1 d-flex justify-content-between align-items-center flex-row">
                <label htmlFor="estiamtedCost" className="col-md-6 form-label">
                  Costo Estimado
                </label>
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control border-0 border-bottom rounded-0 p-0"
                    id="estimatedCost"
                    value={estimatedCost}
                    onChange={handleEstimatedCostChange}
                    maxLength={12}
                  />
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-center flex-shrink-0 w-10">
                {estimatedCostSaved || (
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
              (pendingChanges && name && state && startDate && estimatedCost) ? "btn btn-primary" : "btn btn-primary disabled"
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
