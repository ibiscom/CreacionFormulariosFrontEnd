import { BooleanString } from '../forms-captura/boolean-string.type';
import { SeccionEntity } from '../forms-captura/seccion.entity';

/**
 * Sección de un formulario de consulta: igual a la de captura más el indicador de
 * lista de filtros (SeccionFormularioConsulta.mostrarListaCondiciones del legado).
 */
export interface SeccionConsultaEntity extends SeccionEntity {
  mostrarListaCondiciones?: BooleanString;
}
