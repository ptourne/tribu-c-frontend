export interface RecursoStats {
    horasConsumidasEnTarea: number
    horasConsumidasEnProyecto: number
    tareasFinalizadasEnElProyecto: number
}

export interface Tarea {
    titulo: string
    estado: number
    horasDedicadas: number
}