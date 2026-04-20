import { SeccionEntity } from './seccion.entity';

/** Estructura de secciones del formulario */
export interface SeccionesFormularioEntity {
  [key: string]: SeccionEntity; // Dynamic section names like Seccion_1, Seccion_2, etc.
}
