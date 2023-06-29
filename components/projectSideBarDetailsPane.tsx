import React, { useState, useEffect } from "react";
import axios from "axios";
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
import UnsavedWarningIcon from "./unsavedWarningIcon";

interface ProjectSideBarProps {
  project: Proyecto | undefined;
  getProjectsFunction: Function;
}

const ADD = 0;
const EDIT = 1;

const productList = [
    {
      id: 10, 
      name: "Producto 1", 
      versions: [
        {
          name: "1.8", 
          customizations: ["Custom FIUBA1"]
        },
        {
          name: "1.9", 
          customizations: ["Custom FIUBA2"]
        }
      ]
    }, 
    {
      id: 20, 
      name: "Producto 2", 
      versions: [
        {
          name: "1.4", 
          customizations: ["Custom FIUBA3"]
        },
        {
          name: "1.5", 
          customizations: ["Custom FIUBA4"]
        }
      ]
    }
  ]

function ProjectSideBarDetailsPane({
  project,
  getProjectsFunction,
}: ProjectSideBarProps) {
  const [clients, setClients] = useState([{id: 100, razon_social: "Cliente 1"},{id: 200, razon_social: "Cliente 2"}]);
  const [products, setProducts] = useState(productList);
  const [versions, setVersions] = useState([]);
  const [customizations, setCustomizations] = useState([]);
  const [versionsDict, setVersionsDict] = useState({});

  const [mode, setMode] = useState(EDIT);

  const [lastProject, setLastProject] = useState<Proyecto | undefined>(
    undefined
  );
  const [pendingChanges, setPendingChanges] = useState(false);
  const [name, setName] = useState("");
  const [nameSaved, setNameSaved] = useState(true);
  const [client, setClient] = useState<number | string>("");
  const [product, setProduct] = useState<number | string>("");
  const [version, setVersion] = useState("");
  const [customization, setCustomization] = useState("");
  const [state, setState] = useState(0);
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
      setState(project.estado);
      setClient(project.id_cliente);
      setProduct(project.id_producto);
      setVersion(project.version);
      setCustomization(project.customizacion);
      setStartDate(project.fecha_inicio || null);
      setFinishDate(project.fecha_fin_estimada || null);
      setEstimatedCost(project.costo_estimado.toString());
      if (versionsDict[project.id_producto]) {
        setVersions(versionsDict[project.id_producto].versions);
        if (versionsDict[project.id_producto].customizations[project.version]) setCustomizations(versionsDict[project.id_producto].customizations[project.version]);
      }
      if (!lastProject) setLastProject(project);
    } else {
      setMode(ADD);
      setName("Nuevo Proyecto");
      setState(0);
      setClient("");
      setProduct("");
      setVersion("");
      setCustomization("");
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

  const getClients = async () => {
    axios
      .get("endpoint de obtener clientes")
      .then((data) => {
        if (data.data.ok) {
          console.log(data);
          //setClients(data.data.msg);
        }
      })
      .catch((err) => {
        toast.error(
          err.response?.data?.msg
            ? "Hubo un error al obtener los clientes: " + err.response?.data?.msg
            : "Hubo un error al obtener los clientes",
          {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
          }
        );
      });
  }

  const getProducts = async () => {
    for (let producto of products) {
      let customizationsDict = {};
      for (let version of producto.versions) {
        customizationsDict[version.name] = version.customizations;
      }
      versionsDict[producto.id] = {versions: producto.versions, customizations: customizationsDict};
      console.log(versionsDict);
      setVersionsDict(versionsDict);
    }
    if (project) {
      setVersions(versionsDict[project.id_producto].versions);
      if (versionsDict[project.id_producto].customizations[project.version]) setCustomizations(versionsDict[project.id_producto].customizations[project.version]);
    }
  }

  useEffect(() => {
    getClients();
    getProducts();
  }, []);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    if (mode === EDIT) setNameSaved(false);
    setPendingChanges(true);
  };

  const handleClientChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setClient(parseInt(event.target.value));
    setPendingChanges(true);
  };

  const handleProductChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setProduct(parseInt(event.target.value));
    setVersions(versionsDict[parseInt(event.target.value)].versions);
    setPendingChanges(true);
    setVersion("");
    setCustomization("");
  };

  const handleVersionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setVersion(event.target.value);
    setCustomizations(versionsDict[product].customizations[event.target.value]);
    setPendingChanges(true);
    setCustomization("");
  };

  const handleCustomizationChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCustomization(event.target.value);
    setPendingChanges(true);
  };

  const handleStateChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setState(parseInt(event.target.value));
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

  const handleEstimatedCostChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
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
      customizacion: customization,
      horas_consumidas: 0,
      id_cliente: client,
      id_producto: product,
      version: version,
    };

    // Make an API request to save the changes

    if (mode === ADD) saveProject(projectToSave);
    else updateProject(projectToSave);
  };

  const saveProject = (projectToSave: Proyecto) => {
    axios
      .post(SERVER_NAME_PROYECTOS + "projects", projectToSave)
      .then(() => {
        toast.success("Proyecto guardado correctamente!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
        });
        getProjectsFunction();
        setNameSaved(true);
        setStateSaved(true);
        setClient("");
        setProduct("");
        setVersion("");
        setCustomization("");
        setStartDateSaved(true);
        setFinishDateSaved(true);
        setEstimatedCostSaved(true);
        setPendingChanges(false);

        setName("Nuevo Proyecto");
        setState(0);
        setStartDate(null);
        setFinishDate(null);
        setEstimatedCost("0");
      })
      .catch((e) => {
        toast.error(
          e.response?.data?.msg
            ? "Hubo un error al guardar el proyecto: " + e.response?.data?.msg
            : "Hubo un error al guardar el proyecto",
          {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
          }
        );
      });
  };

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
        console.log(e.response);
        toast.error(
          e.response?.data?.msg
            ? "Hubo un error al actualizar el proyecto: " +
                e.response?.data?.msg
            : "Hubo un error al actualizar el proyecto",
          {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
          }
        );
      });
  };

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
        setState(0);
        setClient("");
        setProduct("");
        setVersion("");
        setCustomization("");
        setStartDate(null);
        setFinishDate(null);
        setEstimatedCost("0");
      })
      .catch((e) => {
        setShowDeleteConfirmation(false);
        toast.error(
          e.response?.data?.msg
            ? "Hubo un error al eliminar el proyecto: " + e.response?.data?.msg
            : "Hubo un error al eliminar el proyecto",
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
            <UnsavedWarningIcon isSavePending={nameSaved!} />
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
              <div className="flex-grow-1 d-flex justify-content-between align-items-center flex-row">
                <label htmlFor="state" className="col-md-6 form-label">
                  Cliente *
                </label>
                <div className="col-md-6">
                  <select
                    className="form-select border-0 border-bottom rounded-0 p-0"
                    id="inputGroupSelect01"
                    value={client}
                    onChange={handleClientChange}
                    disabled={mode === EDIT}
                  >
                    <option value="">Seleccione una opci&oacute;n</option>
                    {clients.map((client) => 
                      <option key={client.id} value={client.id}>{client.razon_social}</option>
                    )}
                  </select>
                </div>
              </div>
              <UnsavedWarningIcon isSavePending={true} />
            </div>
            <div className="d-flex justify-content-between align-items-center flex-row">
              <div className="flex-grow-1 d-flex justify-content-between align-items-center flex-row">
                <label htmlFor="state" className="col-md-6 form-label">
                  Producto *
                </label>
                <div className="col-md-6">
                  <select
                    className="form-select border-0 border-bottom rounded-0 p-0"
                    id="inputGroupSelect02"
                    value={product}
                    onChange={handleProductChange}
                    disabled={mode === EDIT}
                  >
                    <option value="">Seleccione una opci&oacute;n</option>
                    {products.map((product) => 
                      <option key={product.id} value={product.id}>{product.name}</option>
                    )}
                  </select>
                </div>
              </div>
              <UnsavedWarningIcon isSavePending={true} />
            </div>
            <div className="d-flex justify-content-between align-items-center flex-row">
                <div className="flex-grow-1 d-flex justify-content-between align-items-center flex-row">
                  <label htmlFor="version" className="col-md-6 form-label">
                    Versi&oacute;n *
                  </label>
                  <div className="col-md-6">
                    <select
                      className="form-select border-0 border-bottom rounded-0 p-0"
                      id="inputGroupSelect03"
                      value={version}
                      onChange={handleVersionChange}
                      disabled={mode === EDIT || !product}
                    >
                      <option value="">Seleccione una opci&oacute;n</option>
                      {versions.map((version) => 
                        <option key={version.name} value={version.name}>{version.name}</option>
                      )}
                    </select>
                  </div>
                </div>
                <UnsavedWarningIcon isSavePending={true} />
            </div>
            <div className="d-flex justify-content-between align-items-center flex-row">
                <div className="flex-grow-1 d-flex justify-content-between align-items-center flex-row">
                  <label htmlFor="customization" className="col-md-6 form-label">
                    Customizaci&oacute;n *
                  </label>
                  <div className="col-md-6">
                    <select
                        className="form-select border-0 border-bottom rounded-0 p-0"
                        id="inputGroupSelect04"
                        value={customization}
                        onChange={handleCustomizationChange}
                        disabled={mode === EDIT || !version}
                      >
                        <option value="">Seleccione una opci&oacute;n</option>
                        {customizations.map((customization) => 
                          <option key={customization} value={customization}>{customization}</option>
                        )}
                      </select>
                  </div>
                </div>
                <UnsavedWarningIcon isSavePending={true} />
            </div>
            <div className="d-flex justify-content-between align-items-center flex-row">
              <div className="flex-grow-1 d-flex justify-content-between align-items-center flex-row">
                <label htmlFor="state" className="col-md-6 form-label">
                  Estado *
                </label>
                <div className="col-md-6">
                  <select
                    className="form-select border-0 border-bottom rounded-0 p-0"
                    id="inputGroupSelect05"
                    value={state}
                    onChange={handleStateChange}
                  >
                    <option value={0}>No iniciado</option>
                    <option value={1}>En curso</option>
                    <option value={2}>Finalizado</option>
                  </select>
                </div>
              </div>

              <UnsavedWarningIcon isSavePending={stateSaved!} />
            </div>
            
            <div className="d-flex justify-content-between align-items-center flex-row">
              <div className="flex-grow-1 d-flex justify-content-between align-items-center flex-row">
                <label htmlFor="startDate" className="col-md-6 form-label">
                  Fecha de Inicio *
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

              <UnsavedWarningIcon isSavePending={startDateSaved!} />
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

              <UnsavedWarningIcon isSavePending={finishDateSaved!} />
            </div>
            <div className="d-flex justify-content-between align-items-center flex-row">
              <div className="flex-grow-1 d-flex justify-content-between align-items-center flex-row">
                <label htmlFor="estimatedCost" className="col-md-6 form-label">
                  Costo Estimado * 
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

              <UnsavedWarningIcon isSavePending={estimatedCostSaved!} />
            </div>
          </div>
          <button
            type="button"
            className={
              pendingChanges && name && client && product && version && customization && startDate && estimatedCost
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
