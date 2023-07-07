import { Cliente, Recurso, Ticket } from "@/components/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function TicketUrgente() {
  const router = useRouter();
  //El product_id este argumento generico tiene que concindir con el tsx que creamos dentro de la carpeta TicketsUrgente.
  const [recursos, setRecursos] = useState<Array<Recurso>>([]);
  const [ticketProxVencer, setTicketProxVencer] = useState<Array<Ticket>>([]);
  const [ticketsVencidos, setTicketsVencidos] = useState<Array<Ticket>>([]);
  const [clientes, setClientes] = useState<Array<Cliente>>([]);

  const obtenerNombreCliente = (idCliente: number): string => {
    const unCliente = clientes.find((unCliente) => unCliente.id == idCliente);
    if (unCliente) {
      return unCliente["razon social"];
    }
    return "Cargando cliente, por favor espere";
  };

  const obtenerNombreRecurso = (idRecurso: number): string => {
    const recurso = recursos.find((unRecurso) => unRecurso.legajo == idRecurso);
    if (recurso) {
      return `${recurso.Nombre}  ${recurso.Apellido}`;
    }
    return "Cargando recurso, por favor espere";
  };

  //Hacemos un fetch de los clientes.
  const fetchClientes = (): Promise<Array<Cliente>> => {
    return fetch("https://psa-soporte.eeoo.ar/clients", {
      method: "GET",
      headers: {},
    }).then((res) => res.json());
  };

  //Hacemos un fetch de los recursos
  const fetchRecursos = (): Promise<Array<Recurso>> => {
    return fetch("https://psa-recursos.eeoo.ar/recurso", {
      method: "GET",
      headers: {},
    }).then((res) => res.json());
  };

  const { product_id } = router.query;
  console.log(product_id);
  const productID: string = typeof product_id === "string" ? product_id : "-1";
  console.log(`productID : ${productID} `);

  // devuelve true si fecha1 es mas grande que fecha2
  function compararFechas(fecha1: string, fecha2: string): boolean {
    const formato = "DD/MM/YYYY HH:mm:ss";
    const partesFecha1 = fecha1.split(/[/: ]/);
    const partesFecha2 = fecha2.split(/[/: ]/);

    // Crear objetos Date a partir de las partes de fecha
    const date1 = new Date(
      parseInt(partesFecha1[2]),
      parseInt(partesFecha1[1]) - 1,
      parseInt(partesFecha1[0]),
      parseInt(partesFecha1[3]),
      parseInt(partesFecha1[4]),
      parseInt(partesFecha1[5])
    );
    const date2 = new Date(
      parseInt(partesFecha2[2]),
      parseInt(partesFecha2[1]) - 1,
      parseInt(partesFecha2[0]),
      parseInt(partesFecha2[3]),
      parseInt(partesFecha2[4]),
      parseInt(partesFecha2[5])
    );

    if (isNaN(date1.getTime()) || isNaN(date2.getTime())) {
      return false;
    }

    if (date1 < date2) {
      return false;
    } else if (date1 > date2) {
      return true;
    } else {
      return false;
    }
  }

  function convertirFecha(fechaString: string): string {
    const fecha = new Date(fechaString);

    // Obtener los componentes de fecha y hora
    const dia = fecha.getDate();
    const mes = fecha.getMonth() + 1;
    const anio = fecha.getFullYear();
    const horas = fecha.getHours();
    const minutos = fecha.getMinutes();
    const segundos = fecha.getSeconds();

    // Formatear la fecha en el formato deseado
    const fechaFormateada = `${dia.toString().padStart(2, "0")}/${mes
      .toString()
      .padStart(2, "0")}/${anio} ${horas.toString().padStart(2, "0")}:${minutos
      .toString()
      .padStart(2, "0")}:${segundos.toString().padStart(2, "0")}`;

    return fechaFormateada;
  }

  function sumarHoras(hora: string, horasASumar: number): string {
    const fechaHora = hora.split(" ");
    const fecha = fechaHora[0];
    const horaActual = fechaHora[1];

    const fechaPartes = fecha.split("/");
    const dia = parseInt(fechaPartes[0]);
    const mes = parseInt(fechaPartes[1]);
    const anio = parseInt(fechaPartes[2]);

    const horaPartes = horaActual.split(":");
    const horas = parseInt(horaPartes[0]);
    const minutos = parseInt(horaPartes[1]);
    const segundos = parseInt(horaPartes[2]);

    let sumaHoras = horas + horasASumar;
    let sumaDias = 0;

    if (sumaHoras >= 24) {
      sumaDias = Math.floor(sumaHoras / 24);
      sumaHoras %= 24;
    }

    const nuevaFecha = new Date(anio, mes - 1, dia + sumaDias);
    const nuevoDia = nuevaFecha.getDate();
    const nuevoMes = nuevaFecha.getMonth() + 1;
    const nuevoAnio = nuevaFecha.getFullYear();

    const horaSumada = `${nuevoDia.toString().padStart(2, "0")}/${nuevoMes
      .toString()
      .padStart(2, "0")}/${nuevoAnio} ${sumaHoras
      .toString()
      .padStart(2, "0")}:${minutos.toString().padStart(2, "0")}:${segundos
      .toString()
      .padStart(2, "0")}`;

    return horaSumada;
  }

  // por primera vez entra aca
  // para saber que no es tipo de undefined.
  useEffect(() => {
    const filtrarTickesVencidos = (unTicket: Ticket) => {
      if (unTicket.state == "Cerrado") return false;
      console.log(" unTicket.timeStart: ", unTicket.timeStart);
      console.log("unTicket.supportTime: en (dias) ", unTicket.supportTime);
      const currentDate = new Date(); // Obtiene la fecha actual
      const dateTime = new Date(unTicket.timeStart);
      const targetDate = new Date(
        dateTime.getTime() + unTicket.supportTime * 24 * 60 * 60 * 1000
      );

      return targetDate < currentDate;
    };
    const filtrarTicketsProximosAVencer = (unTicket: Ticket) => {
      if (unTicket.state == "Cerrado") return false;
      const currentDate = new Date(); // Obtiene la fecha actual
      const dateTime = new Date(unTicket.timeStart);
      const targetDate = new Date(
        dateTime.getTime() + unTicket.supportTime * 24 * 60 * 60 * 1000
      );

      // Calcula la diferencia en milisegundos entre las dos fechas
      const timeDifference = targetDate.getTime() - currentDate.getTime();
      const oneDayInMilliseconds = 24 * 60 * 60 * 1000; // Milisegundos en un día

      // Comprueba si la diferencia es aproximadamente de 1 día
      return timeDifference <= oneDayInMilliseconds && timeDifference > 0;
    };
    const fetchTicketsByID = (): Promise<Array<Ticket>> => {
      const URLGetTickesById = `https://psa-soporte.eeoo.ar/tickets/product/${parseInt(
        productID
      )}`;
      return fetch(URLGetTickesById, { method: "GET", headers: {} }).then(
        (response) => response.json()
      );
    };

    if (typeof product_id !== "undefined") {
      console.log(`product_id : que carjaos if ${product_id}`);
      fetchClientes().then((clientesFetch) => {
        setClientes(clientesFetch);
      });
      fetchRecursos().then((recursosFetch) => {
        setRecursos(recursosFetch);
      });

      fetchTicketsByID().then((ticketsFetch) => {
        if (ticketsFetch.length > 0) {
          const ticketsProx2Horas = ticketsFetch.filter(
            filtrarTicketsProximosAVencer
          );
          const ticketsVencidosFetch = ticketsFetch.filter(
            filtrarTickesVencidos
          );

          setTicketProxVencer(ticketsProx2Horas);
          setTicketsVencidos(ticketsVencidosFetch);
        }
      });
    }
  }, [product_id, productID]);

  const formatDateTime = (creationTime: string): string => {
    console.log("dateTime: ");
    const dateTime = new Date(creationTime);
    console.log(dateTime);
    const year = String(dateTime.getFullYear());
    const month = String(dateTime.getMonth() + 1).padStart(2, "0"); // Los meses comienzan desde 0, por eso se suma 1
    const day = String(dateTime.getDate()).padStart(2, "0");
    const hours = String(dateTime.getHours()).padStart(2, "0");
    const minutes = String(dateTime.getMinutes()).padStart(2, "0");
    const seconds = String(dateTime.getSeconds()).padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  };

  const lastDate = (creationTime: string, days: number): string => {
    console.log("dateTime: ");
    const dateTime = new Date(creationTime);
    const fechaFinal = new Date(
      dateTime.getTime() + days * 24 * 60 * 60 * 1000
    );
    console.log(fechaFinal);
    const year = String(fechaFinal.getFullYear());
    const month = String(fechaFinal.getMonth() + 1).padStart(2, "0"); // Los meses comienzan desde 0, por eso se suma 1
    const day = String(fechaFinal.getDate()).padStart(2, "0");
    const hours = String(fechaFinal.getHours()).padStart(2, "0");
    const minutes = String(fechaFinal.getMinutes()).padStart(2, "0");
    const seconds = String(fechaFinal.getSeconds()).padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  };

  const getHourDifference = (
    dateString: string,
    supportTime: number
  ): number => {
    const currentDate = new Date(); // Obtiene la fecha actual
    const dateTime = new Date(dateString); // Convierte la fecha de texto a un objeto Date
    const targetDate = new Date(
      dateTime.getTime() + supportTime * 24 * 60 * 60 * 1000
    );
    const timeDifference = targetDate.getTime() - currentDate.getTime(); // Diferencia en milisegundos
    const hourDifference = Math.floor(timeDifference / (1000 * 60 * 60)); // Diferencia en horas

    return hourDifference;
  };

  const getMinutesDifference = (
    dateString: string,
    supportTime: number
  ): number => {
    const currentDate = new Date(); // Obtiene la fecha actual
    const dateTime = new Date(dateString); // Convierte la fecha de texto a un objeto Date
    const targetDate = new Date(
      dateTime.getTime() + supportTime * 24 * 60 * 60 * 1000
    );
    const timeDifference = targetDate.getTime() - currentDate.getTime(); // Diferencia en milisegundos
    const minuteDifference = Math.floor(timeDifference / (1000 * 60)); // Diferencia en minutos

    return minuteDifference;
  };

  return (
    <>
      <div id="ContainerUrgentes">
        <div id="divTicketsProxVencer">
          <h1 id="tituloTicketUrgente">Tickets proximos a vencer </h1>

          <ul style={{ marginTop: "30px", width: "800px" }}>
            {ticketProxVencer.map((unTicket) => (
              <li
                key={unTicket.id}
                id="LiTicketForAProductUrgent"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ marginBottom: "10px" }}>
                  <h1 id="tituloH1BlancoUrgene">{unTicket.title}</h1>
                  <p id="LetraGrande">
                    <strong>
                      Horas Restantes:{" "}
                      {getHourDifference(
                        unTicket.timeStart,
                        unTicket.supportTime
                      )}{" "}
                      (
                      {getMinutesDifference(
                        unTicket.timeStart,
                        unTicket.supportTime
                      )}{" "}
                      minutos ){" "}
                    </strong>
                  </p>

                  <p>
                    <strong>Responsable:</strong>{" "}
                    {obtenerNombreRecurso(unTicket.responsible_id)}
                  </p>
                  <p>
                    <strong>Severidad:</strong> {unTicket.severity}
                  </p>
                  <p>
                    <strong>Prioridad:</strong> {unTicket.priority}
                  </p>
                  <p>
                    <strong>Finaliza:</strong>{" "}
                    {lastDate(unTicket.timeStart, unTicket.supportTime)}
                  </p>
                </div>
                <div
                  style={{
                    position: "absolute",
                    marginLeft: "300px",
                    marginTop: "0px",
                  }}
                ></div>
              </li>
            ))}
          </ul>
        </div>

        <div id="divTicketsVencidos">
          <h1 id="tituloTicketUrgente"> Tickets vencidos </h1>
          <ul style={{ marginTop: "30px", width: "800px" }}>
            {ticketsVencidos.map((unTicket) => (
              <li
                key={unTicket.id}
                id="LiTicketForAProductUrgent"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ marginBottom: "10px" }}>
                  <h1 id="tituloH1BlancoUrgene">{unTicket.title}</h1>
                  <p id="LetraGrande">
                    <strong>
                      Finalizó hace:{" "}
                      {getHourDifference(
                        unTicket.timeStart,
                        unTicket.supportTime
                      )}
                    </strong>
                  </p>

                  <p>
                    <strong>Responsable:</strong>{" "}
                    {obtenerNombreRecurso(unTicket.responsible_id)}
                  </p>
                  <p>
                    <strong>Severidad:</strong> {unTicket.severity}
                  </p>
                  <p>
                    <strong>Prioridad:</strong> {unTicket.priority}
                  </p>
                  <p>
                    <strong>Finaliza:</strong>{" "}
                    {lastDate(unTicket.timeStart, unTicket.supportTime)}
                  </p>
                </div>
                <div
                  style={{
                    position: "absolute",
                    marginLeft: "300px",
                    marginTop: "0px",
                  }}
                ></div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default TicketUrgente;
