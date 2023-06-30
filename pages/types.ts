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
  id_proyecto: string;
  titulo: string;
  descripcion: string;
  tiempo_estimado_finalizacion: number;
  horas_acumuladas: number;
  estado: number;
  legajo_responsable: string;

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

export interface Recurso {
  Nombre: string
  Apellido: string
  legajo: number
}

export interface BloqueDeTrabajo {
  codBloqueLaboral: number
  codProyectoDeLaTarea: number
  codTarea: number
  legajo: number
  horasDelBloque: number
  fecha: Date
}