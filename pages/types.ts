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
  codigo: number;
  costo_estimado: number;
  fecha_inicio: Date;
  fecha_fin_estimada: Date;
  estado: string;
  customizacion: string;
  horas_consumidas: number;
  id_cliente: number;
  id_producto: number;
  nombre: string;
  version: "string";
}

export interface Tarea {
  id: string
  titulo: string
  descripcion: string
  tiempo_estimado_fin: number;
  horas_acumuladas: number;
  estado: string;
}

export interface Producto {
  id: string
  nombre: string
  version: number;
}