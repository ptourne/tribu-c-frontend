export interface Usuario {
  nombre: string
  apellido: string
  legajo: number
}

export interface Cliente {
  id: string
  razon_social: string
  cuit: number
}

export interface Proyecto {
  id: string
  nombre: string
  fecha_inicio: Date
  fecha_fin: Date
  estado: string;
  horas_consumidas: number;
  costo_proyecto: number;
}

export interface Tarea {
  id: string
  titulo: string
  descripcion: string
  tiempo_estimado_fin: number;
  horas_acumuladas: number;
  estado: number;
  prioridad: number;
}

export interface Producto {
  id: string
  nombre: string
  version: number;
}