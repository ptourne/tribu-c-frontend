import { useRouter } from "next/router";
import { RiCalendar2Fill } from "react-icons/ri";
import { FormTicket } from "../../Componentes/FormTicket";

export default function AgregarTicket() {
  const router = useRouter();
  const { clientId, responsibleId, idTicket } = router.query;

  return (
    <>
      <h1>Agregar Ticket</h1>
      Calendario jejeje <RiCalendar2Fill size={44} /> {clientId} {responsibleId}{" "}
      {idTicket}
      <FormTicket />
    </>
  );
}
