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
