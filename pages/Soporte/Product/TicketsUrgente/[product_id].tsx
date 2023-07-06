import { Cliente, Recurso, Ticket } from "@/components/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function TicketUrgente() {
  const router = useRouter();
  //El product_id este argumento generico tiene que concindir con el tsx que creamos dentro de la carpeta TicketsUrgente.
  const [tickets, setTickets] = useState<Array<Ticket>>([]);
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
      const tiempoSumado = sumarHoras(
        unTicket.timeStart,
        parseInt(unTicket.supportTime)
      );
      const horaActual = convertirFecha(new Date().toString());

      //si la horaActual ej 15 + 2 , es mayor a tiempo sumado entonces esta prox a vencer el ticket
      console.log(`TIEMPoInicio : ${unTicket.timeStart}`);
      console.log(`horaActual : ${horaActual}`);
      console.log(`tiempoSumado: ${tiempoSumado}`);
      const yaSeVencioTicket = compararFechas(horaActual, tiempoSumado);
      console.log(`RESULTADO: -${yaSeVencioTicket}- `);
      return yaSeVencioTicket;
    };
    const filtrarTicketsProximosAVencer = (unTicket: Ticket) => {
      const tiempoSumado = sumarHoras(
        unTicket.timeStart,
        parseInt(unTicket.supportTime)
      );
      const horaActual = convertirFecha(new Date().toString());

      //si la horaActual ej 15 + 2 , es mayor a tiempo sumado entonces esta prox a vencer el ticket
      const prox2Horas = compararFechas(
        sumarHoras(horaActual, 2),
        tiempoSumado
      );
      const yaSeVencioTicket = compararFechas(horaActual, tiempoSumado);

      return prox2Horas && !yaSeVencioTicket;
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
                      Horas Restantes: {unTicket.supportTime} (
                      {60 * parseFloat(unTicket.supportTime)} minutos ){" "}
                    </strong>
                  </p>

                  <p>
                    <strong>Descripción:</strong> {unTicket.description}
                  </p>
                  <p>
                    <strong>Inicio:</strong> {unTicket.timeStart}
                  </p>
                  <p>
                    <strong>Cliente:</strong>{" "}
                    {obtenerNombreCliente(unTicket.client_id)}
                  </p>
                  <p>
                    <strong>Responsable:</strong>{" "}
                    {obtenerNombreRecurso(unTicket.responsible_id)}
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
                      Hora que finalizo:
                      {sumarHoras(
                        unTicket.timeStart,
                        parseInt(unTicket.supportTime)
                      )}
                      {"     "}horas
                    </strong>
                  </p>

                  <p>
                    <strong>Descripción:</strong> {unTicket.description}
                  </p>
                  <p>
                    <strong>Inicio:</strong> {unTicket.timeStart}
                  </p>
                  <p>
                    <strong>Cliente:</strong>{" "}
                    {obtenerNombreCliente(unTicket.client_id)}
                  </p>
                  <p>
                    <strong>Responsable:</strong>{" "}
                    {obtenerNombreRecurso(unTicket.responsible_id)}
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
