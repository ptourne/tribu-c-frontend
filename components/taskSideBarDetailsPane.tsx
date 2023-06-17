import React, { useState, useEffect } from "react";
import axios from "axios";
import { Tarea } from "../pages/types";
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
import TaskStatusButtons from "./taskStatusButtons";

interface TaskSideBarProps {
  task: Tarea | undefined;
}

const ADD = 0;
const EDIT = 1;

function TaskSideBarDetailsPane({ task }: TaskSideBarProps) {
  const [mode, setMode] = useState(EDIT);

  const [lastTask, setLastTask] = useState<Tarea | undefined>(undefined);
  const [pendingChanges, setPendingChanges] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [tituloSaved, setTituloSaved] = useState(true);
  const [state, setState] = useState(0);
  const [stateSaved, setStateSaved] = useState(true);
  const [description, setdescription] = useState("");
  const [descriptionSaved, setdescriptionSaved] = useState(true);
  const [estimatedDuration, setEstimatedDuration] = useState(0);
  const [estimatedDurationSaved, setEstimatedDurationSaved] = useState(true);
  const [accumulatedHours, setAccumulatedHours] = useState(0);
  const [accumulatedHoursSaved, setAccumulatedHoursSaved] = useState(true);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  useEffect(() => {
    if (task) {
      setMode(EDIT);
      setTitulo(task.titulo || "");
      setState(task.estado || 0);
      setdescription(task.descripcion || "");
      setEstimatedDuration(task.tiempo_estimado_fin || 0);
      setAccumulatedHours(task.horas_acumuladas || 0);
      if (!lastTask) setLastTask(task);
    } else {
      setMode(ADD);
      setTitulo("Nuevo Tarea");
      setState(0);
      setdescription("");
      setEstimatedDuration(0);
      setAccumulatedHours(0);
    }
    if (pendingChanges) {
      toast.warning(
        task && lastTask
          ? "Se descartaron los cambios de " + lastTask.titulo
          : "Se descartaron los cambios",
        {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
        }
      );
    }
    setLastTask(task);
    setTituloSaved(true);
    setStateSaved(true);
    setdescriptionSaved(true);
    setEstimatedDurationSaved(true);
    setAccumulatedHoursSaved(true);
    setPendingChanges(false);
  }, [task]);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitulo(event.target.value);
    if (mode === EDIT) setTituloSaved(false);
    setPendingChanges(true);
  };

  const handleStateChange = (value: number) => {
    setState(value);
    if (mode === EDIT) setStateSaved(false);
    setPendingChanges(true);
  };

  const handleDescriptionChange = (value: string) => {
    setdescription(value);
    if (mode === EDIT) setdescriptionSaved(false);
    setPendingChanges(true);
  };

  const handleEstimatedDurationChange = (value: number) => {
    setEstimatedDuration(value);
    if (mode === EDIT) setEstimatedDurationSaved(false);
    setPendingChanges(true);
  };

  const handleAccumulatedHoursChange = (value: number) => {
    setAccumulatedHours(value);
    if (mode === EDIT) setAccumulatedHoursSaved(false);
    setPendingChanges(true);
  };

  const handleSave = () => {
    // Create an object with the updated values
    const taskToSave: Tarea = {
      id: task?.id,
      titulo: titulo,
      estado: state,
    };

    // Make an API request to save the changes

    if (mode === ADD) saveTask(taskToSave);
    else updateTask(taskToSave);
  };

  const saveTask = (taskToSave: Tarea) => {
    axios
      .post(SERVER_NAME_PROYECTOS + "tasks", taskToSave)
      .then(() => {
        toast.success("Tarea guardado correctamente!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
        });
        setTituloSaved(true);
        setStateSaved(true);
        setLastTask(task);
        setTituloSaved(true);
        setStateSaved(true);
        setdescriptionSaved(true);
        setEstimatedDurationSaved(true);
        setAccumulatedHoursSaved(true);
        setPendingChanges(false);

        setTitulo("Nueva Tarea");
        setState(0);
        setdescription("");
        setEstimatedDuration(0);
        setAccumulatedHours(0);
      })
      .catch((e) => {
        /*if (e.response?.data?.msg) return setActionError('Error saving configuration: ' + e.response.data.msg)
        else return setActionError('Error saving configuration')*/
      });
  };

  const updateTask = (taskToSave: Tarea) => {
    axios
      .put(SERVER_NAME_PROYECTOS + "admin/save-price-rules", taskToSave)
      .then(() => {
        toast.success("Cambios guardados correctamente!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
        });
        setTituloSaved(true);
        setStateSaved(true);
        setLastTask(task);
        setTituloSaved(true);
        setStateSaved(true);
        setdescriptionSaved(true);
        setEstimatedDurationSaved(true);
        setAccumulatedHoursSaved(true);
        setPendingChanges(false);
      })
      .catch((e) => {
        /*if (e.response?.data?.msg) return setActionError('Error saving configuration: ' + e.response.data.msg)
        else return setActionError('Error saving configuration')*/
      });
  };

  const handleDeleteTask = () => {
    //Llamar API
    setShowDeleteConfirmation(false);
    if (true /*eliminado correctamente*/) {
      toast.success("Tarea eliminado correctamente.", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
      });

      if (task) {
        setTitulo(task.titulo || "");
        setState(task.estado || 0);
        setdescription(task.descripcion || "");
        setEstimatedDuration(task.tiempo_estimado_fin || 0);
        setAccumulatedHours(task.horas_acumuladas || 0);
        setTituloSaved(true);
        setStateSaved(true);
        setLastTask(task);
        setTituloSaved(true);
        setStateSaved(true);
        setdescriptionSaved(true);
        setEstimatedDurationSaved(true);
        setAccumulatedHoursSaved(true);
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

  const SELECTOR_STYLE = "col-md-1 flex-fill p-0 m-0 btn";

  return (
    <>
      <div>
        <form className="d-flex flex-col">
          <div className="d-flex justify-content-between align-items-center flex-row mt-1 mb-2">
            <div className="w-10 fs-2 text-body-secondary flex-shrink-0 ml-2 mr-2">
              {task && task.id}
            </div>
            <div className="">
              <input
                type="text"
                className="form-control border-0 border-bottom rounded-0 p-0 fs-2"
                id="titulo"
                value={titulo}
                onChange={handleNameChange}
              />
            </div>
            <div className="d-flex align-items-center justify-content-center flex-shrink-0 w-10 ml-3 mr-3">
              {tituloSaved || (
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
            {mode === EDIT && (
              <button
                type="button"
                className="btn btn-lg btn-outline-danger d-flex align-items-center justify-content-center"
                onClick={() => {
                  setShowDeleteConfirmation(true);
                }}
              >
                <MdDelete />
              </button>
            )}
          </div>
          <div className="d-flex justify-content-between flex-col mt-1 mb-3">
            <div className="d-flex justify-content-between align-items-center flex-row">
              <div className="d-flex flex-fill justify-content-between align-items-center flex-row">
                <label htmlFor="state" className="col-md-4 form-label">
                  Estado
                </label>
                <div className="col-md-8">
                  <TaskStatusButtons
                    selectedState={state}
                    setSelectedState={handleStateChange}
                  />
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
          </div>
          <div className="d-flex justify-content-between flex-col mt-1 mb-3">
            <div className="d-flex justify-content-between align-items-center flex-row">
              <div className="flex-grow-1 d-flex justify-content-between align-items-center flex-row">
                <label htmlFor="state" className="col-md-6 form-label">
                  Tiempo estimado de trabajo
                </label>

                <div className="mb-3 d-flex flex-row">
                  <input
                    type="text"
                    className="form-form-control border-0 border-bottom rounded-0 p-0"
                    aria-describedby="basic-addon2"
                    onChange={handleEstimatedDurationChange}
                  />
                  <span className="input-group-text" id="basic-addon2">
                    horas
                  </span>
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
          </div>
          <button
            type="button"
            className={
              pendingChanges && titulo && state
                ? "btn btn-primary"
                : "btn btn-primary disabled"
            }
            onClick={handleSave}
          >
            {mode === EDIT ? "Guardar cambios" : "Guardar"}
          </button>
        </form>
      </div>
      <Modal
        show={showDeleteConfirmation}
        onHide={handleDeleteConfirmationClose}
      >
        <Modal.Header closeButton className="bg-danger text-white">
          <Modal.Title>Eliminar tarea</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            ¿Estás seguro que quieres eliminar
            {task ? ' la tarea "' + task.titulo + '"' : " esta tarea"}?
          </p>
          <p>Esta acción no puede ser revertida.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteConfirmationClose}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleDeleteTask}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default TaskSideBarDetailsPane;
