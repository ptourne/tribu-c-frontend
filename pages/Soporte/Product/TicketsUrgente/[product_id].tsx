import { Recurso, Ticket } from "@/components/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function TicketUrgente() {
  const router = useRouter();
  //El product_id este argumento generico tiene que concindir con el tsx que creamos dentro de la carpeta TicketsUrgente.
  const [recursos, setRecursos] = useState<Array<Recurso>>([]);
  const [ticketProxVencer, setTicketProxVencer] = useState<Array<Ticket>>([]);
  const [ticketsVencidos, setTicketsVencidos] = useState<Array<Ticket>>([]);

  const obtenerNombreRecurso = (idRecurso: number): string => {
    const recurso = recursos.find((unRecurso) => unRecurso.legajo == idRecurso);
    if (recurso) {
      return `${recurso.Nombre}  ${recurso.Apellido}`;
    }
    return "Cargando recurso, por favor espere";
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
      console.log("currentDate:", currentDate);
      console.log("targetDate: ", targetDate);

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
      console.log(`product_id : en if${product_id}`);
      fetchRecursos().then((recursosFetch) => {
        setRecursos(recursosFetch);
      });

      fetchTicketsByID().then((ticketsFetch) => {
        if (ticketsFetch.length > 0) {
          const ticketsProxVencer = ticketsFetch.filter(
            filtrarTicketsProximosAVencer
          );
          const ticketsVencidosFetch = ticketsFetch.filter(
            filtrarTickesVencidos
          );

          setTicketProxVencer(ticketsProxVencer);
          setTicketsVencidos(ticketsVencidosFetch);
        }
      });
    }
  }, [product_id, productID]);

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
          <h1 id="tituloTicketUrgente">Tickets proximos a vencer: </h1>

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
          <h1 id="tituloTicketUrgente"> Tickets vencidos: </h1>
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
                      Finalizó hace:{"     "}
                      {-1 *
                        getHourDifference(
                          unTicket.timeStart,
                          unTicket.supportTime
                        )}{" "}
                      horas
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
                    <strong>Finalizo:</strong>{" "}
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
