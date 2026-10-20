import { SeccionConsultaEntity } from './seccion-consulta.entity';

/** Estructura de secciones del formulario de consulta */
export interface SeccionesFormularioConsultaEntity {
  [key: string]: SeccionConsultaEntity; // Seccion_1, Seccion_2, ...
}
