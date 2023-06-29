export interface Usuario {
  nombre: string
  apellido: string
  legajo: number
}

export interface Cliente {
  id: number
  razon_social: string
  CUIT: string
}

export interface Proyecto {
  codigo?: number;
  costo_estimado: number;
  fecha_inicio: Date | null;
  fecha_fin_estimada: Date | null;
  estado: number;
  customizacion: string;
  horas_consumidas: number;
  id_cliente: number;
  id_producto: number;
  nombre: string;
  version: string;
}

export interface Tarea {
  id_tarea: string;
  id_project: string;
  titulo: string;
  descripcion: string;
  tiempo_estimado_fin: number;
  horas_acumuladas: number;
  estado: number;
  responsable: string;

}

export interface Producto {
  name: string
  version: string;
  id: number
}

export interface Ticket {
  title: string;
  description: string;
  severity: string;
  priority: string;
  state: string;
  timeStart: string;
  type: string;
  supportTime: string;
  id: number;
  product_id: number;
  client_id: number;
  responsible_id: number;
}