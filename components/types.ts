import { Usuario } from "@/pages/types"
import { IconType } from "react-icons";

export interface ISidebarItem {
  href: string;
  title?: string;
  icon?: IconType;
  children?: ISidebarItem[];
}

export interface ModalProps {
  modalOpen: boolean
  setModalOpen: (x: boolean) => void
  list: Usuario[]
}
