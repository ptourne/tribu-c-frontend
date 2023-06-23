import { useRouter } from "next/router";
import { RiCalendar2Fill } from "react-icons/ri";
import { FormTicket } from "../../Componentes/FormTicket";

export default function AgregarTicket() {
  const router = useRouter();
  const { productID } = router.query;
  let productIDNumerico = 0;
  if (typeof productID === "string") {
    productIDNumerico = parseInt(productID);
  } else productIDNumerico = -1;

  return (
    <>
      <h1>Agregar Ticket</h1>
      Calendario jejeje <RiCalendar2Fill size={44} />
      <FormTicket productIdNumerico={productIDNumerico} />
    </>
  );
}
