import { Ticket } from "@/pages/types";
import { useRouter } from "next/router";

export default function Ticket() {
  const router = useRouter();
  const { tickets } = router.query;
  console.log(tickets);

  return (
    <div>
      <h1>{tickets}</h1>
      <h1>holaa jejeje</h1>
    </div>
  );
}
