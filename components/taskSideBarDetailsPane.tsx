import React, { useState, useEffect } from "react";
import axios from "axios";
import { Proyecto, Tarea } from "../pages/types";
import { AiOutlineCheck, AiOutlineCheckCircle } from "react-icons/ai";
import { IoIosWarning } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { Turret_Road } from "next/font/google";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Typography, Tooltip } from "@mui/material";
import "react-datepicker/dist/react-datepicker.css";
import { Button, Modal } from "react-bootstrap";
import { SERVER_NAME_PROYECTOS } from "@/environments";
import TaskStatusButtons from "./taskStatusButtons";
import UnsavedWarningIcon from "./unsavedWarningIcon";

interface TaskSideBarProps {
  task: Tarea | undefined;
  project_id: string;
  getTasksFunction: Function;
}

const ADD = 0;
const EDIT = 1;

function TaskSideBarDetailsPane({
  task,
  project_id,
  getTasksFunction,
}: TaskSideBarProps) {
  const [resources, setResources] = useState([{legajo: 1, Nombre: "Juan", Apellido: "Perez"}, {legajo: 2, Nombre: "Maria", Apellido: "Lopez"}]);

  const [mode, setMode] = useState(EDIT);
  const [lastTask, setLastTask] = useState<Tarea | undefined>(undefined);
  const [pendingChanges, setPendingChanges] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [tituloSaved, setTituloSaved] = useState(true);
  const [responsible, setResponsible] = useState("");
  const [responsibleSaved, setResponsibleSaved] = useState(true);
  const [state, setState] = useState(0);
  const [stateSaved, setStateSaved] = useState(true);
  const [description, setDescription] = useState("");
  const [descriptionSaved, setDescriptionSaved] = useState(true);
  const [estimatedDuration, setEstimatedDuration] = useState(0);
  const [estimatedDurationSaved, setEstimatedDurationSaved] = useState(true);
  const [accumulatedHours, setAccumulatedHours] = useState(0);
  const [accumulatedHoursSaved, setAccumulatedHoursSaved] = useState(true);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  useEffect(() => {
    if (task) {
      setMode(EDIT);
      setTitulo(task.titulo || "");
      setResponsible(task.legajo_responsable || "");
      setState(task.estado || 0);
      setDescription(task.descripcion || "");
      setEstimatedDuration(task.tiempo_estimado_fin || 0);
      setAccumulatedHours(task.horas_acumuladas || 0);
      if (!lastTask) setLastTask(task);
    } else {
      setMode(ADD);
      setTitulo("Nuevo Tarea");
      setResponsible("");
      setState(0);
      setDescription("");
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
    setResponsibleSaved(true);
    setStateSaved(true);
    setDescriptionSaved(true);
    setEstimatedDurationSaved(true);
    setAccumulatedHoursSaved(true);
    setPendingChanges(false);
  }, [task]);

  const getResources = async () => {
    axios
      .get("endpoint de obtener recursos")
      .then((data) => {
        if (data.data.ok) {
          console.log(data);
          //setResources(data.data.msg);
        }
      })
      .catch((err) => {
        toast.error(
          err.response?.data?.msg
            ? "Hubo un error al obtener los responsables: " + err.response?.data?.msg
            : "Hubo un error al obtener los responsables",
          {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
          }
        );
      });
  }

  useEffect(() => {
    getResources();
  }, []);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitulo(event.target.value);
    if (mode === EDIT) setTituloSaved(false);
    setTituloSaved(false);
    setPendingChanges(true);
  };

  const handleResponsibleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setResponsible(event.target.value);
    if (mode === EDIT) setResponsibleSaved(false);
    setPendingChanges(true);
  };

  const handleStateChange = (value: number) => {
    setState(value);
    if (mode === EDIT) setStateSaved(false);
    setStateSaved(false);
    setPendingChanges(true);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = event.target.value;
    setDescription(value);
    if (mode === EDIT) setDescriptionSaved(false);
    setDescriptionSaved(false);
    setPendingChanges(true);
  };

  const handleEstimatedDurationChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseInt(event.target.value);
    if (!isNaN(value) && estimatedDuration != value) {
      setEstimatedDuration(value);
      if (mode === EDIT) setEstimatedDurationSaved(false);
      setEstimatedDurationSaved(false);
      setPendingChanges(true);
    }
  };

  const handleAccumulatedHoursChange = (value: number) => {
    setAccumulatedHours(value);
    if (mode === EDIT) setAccumulatedHoursSaved(false);
    setAccumulatedHoursSaved(false);
    setPendingChanges(true);
  };

  const handleSave = () => {
    // Create an object with the updated values
    const taskToSave: Tarea = {
      id_tarea: task?.id_tarea,
      titulo: titulo,
      descripcion: description,
      tiempo_estimado_finalizacion: estimatedDuration,
      horas_acumuladas: 1,
      estado: state,
      legajo_responsable: responsible,
    };
    console.log(taskToSave);

    // Make an API request to save the changes
    if (mode === ADD) saveTask(taskToSave);
    else updateTask(taskToSave);
  };

  const saveTask = (taskToSave: Tarea) => {
    axios
      .post(
        SERVER_NAME_PROYECTOS + "projects/" + project_id + "/tasks",
        taskToSave
      )
      .then((response) => {
        const responseData = response.data;
        console.log("Datos devueltos por el servidor:", responseData);
        toast.success("Tarea guardado correctamente!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
        });
        getTasksFunction();
        setTituloSaved(true);
        setResponsibleSaved(true);
        setStateSaved(true);
        setLastTask(task);
        setTituloSaved(true);
        setStateSaved(true);
        setDescriptionSaved(true);
        setEstimatedDurationSaved(true);
        setAccumulatedHoursSaved(true);
        setPendingChanges(false);

        setTitulo("Nueva Tarea");
        setState(0);
        setResponsible("");
        setDescription("");
        setEstimatedDuration(0);
        setAccumulatedHours(0);
      })
      .catch((e) => {
        console.log(e.response);
        toast.error(
          e.response?.data?.msg
            ? "Hubo un error al guardar la tarea: " + e.response?.data?.msg
            : "Hubo un error al guardar la tarea",
          {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
          }
        );
      });
  };

  const updateTask = (taskToSave: Tarea) => {
    axios
      .put(SERVER_NAME_PROYECTOS + "projects/" + project_id + "/tasks/" + task?.id_tarea, taskToSave)
      .then(() => {
        toast.success("Cambios guardados correctamente!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
        });
        getTasksFunction();
        setTituloSaved(true);
        setResponsibleSaved(true);
        setStateSaved(true);
        setLastTask(task);
        setTituloSaved(true);
        setStateSaved(true);
        setDescriptionSaved(true);
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
    axios
      .delete(
        SERVER_NAME_PROYECTOS + `projects/${project_id}/tasks/${task?.id_tarea}`
      )
      .then(() => {
        setShowDeleteConfirmation(false);
        toast.success("Tarea eliminado correctamente.", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
        });

        getTasksFunction();
        setTituloSaved(true);
        setResponsibleSaved(true);
        setStateSaved(true);
        setLastTask(task);
        setTituloSaved(true);
        setStateSaved(true);
        setDescriptionSaved(true);
        setEstimatedDurationSaved(true);
        setAccumulatedHoursSaved(true);

        setTitulo(task?.titulo || "");
        setResponsible("");
        setState(task?.estado || 0);
        setDescription(task?.descripcion || "");
        setEstimatedDuration(task?.tiempo_estimado_fin || 0);
        setAccumulatedHours(task?.horas_acumuladas || 0);
        setPendingChanges(false);
      })
      .catch((e) => {
        setShowDeleteConfirmation(false);
        toast.error(
          e.response?.data?.msg
            ? "Hubo un error al eliminar la tarea: " + e.response?.data?.msg
            : "Hubo un error al eliminar la tarea",
          {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
          }
        );
      });
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
              {task && task.id_tarea}
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

            <UnsavedWarningIcon isSavePending={tituloSaved} />
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
              <div className="d-flex my-1 flex-fill justify-content-between align-items-center flex-row">
                <div className="col-md-5">Estado *</div>
                <div className="col-md-7 ms-3 d-flex justify-content-between align-items-center flex-row flex-fill">
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
          <div className="d-flex justify-content-between align-items-center flex-row">
              <div className="flex-grow-1 d-flex justify-content-between align-items-center flex-row">
                <label htmlFor="state" className="col-md-6 form-label">
                  Responsable Asignado *
                </label>
                <div className="col-md-6">
                  <select
                    className="form-select border-0 border-bottom rounded-0 p-0"
                    id="inputGroupSelect01"
                    value={responsible}
                    onChange={handleResponsibleChange}
                  >
                    <option value="">Seleccione una opci&oacute;n</option>
                    {resources.map((resource) => 
                      <option key={resource.legajo} value={resource.legajo}>{resource.Nombre + ' ' + resource.Apellido}</option>
                    )}
                  </select>
                </div>
              </div>
              <UnsavedWarningIcon isSavePending={responsibleSaved} />
          </div>
          <div className="d-flex justify-content-between align-items-center flex-row">
            <div className="d-flex my-1 flex-fill justify-content-between align-items-center flex-row">
              <div className="col-md-5">Tiempo estimado de trabajo *</div>

              <div className="col-md-7 ms-3 d-flex justify-content-between align-items-center flex-row flex-fill">
                <input
                  type="text"
                  className="form-control border-0 border-bottom rounded-0 p-0"
                  id="estimatedDuration"
                  value={estimatedDuration}
                  onChange={handleEstimatedDurationChange}
                  maxLength={12}
                />
                <div className="d-flex align-items-center justify-content-center flex-shrink-0 w-10">
                  horas
                </div>
              </div>
            </div>

            <UnsavedWarningIcon isSavePending={estimatedDurationSaved} />
          </div>

          <div className="d-flex flex-col my-1">
            <div className="d-flex justify-content-between align-items-center flex-row">
              <div className="d-flex my-1 flex-fill justify-content-between align-items-center flex-row">
                Descripción
              </div>
              <UnsavedWarningIcon isSavePending={descriptionSaved} />
            </div>
            <textarea
              className="form-control"
              id="description"
              value={description}
              onChange={handleDescriptionChange}
              maxLength={100}
              rows={3}
            ></textarea>
          </div>

          <button
            type="button"
            className={
              (pendingChanges || mode == ADD) && titulo
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
