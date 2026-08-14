import { FormularioJSONEntity } from '../forms-captura/formulario-json.entity';
import { SeccionesFormularioEntity } from '../forms-captura/secciones-formulario.entity';
/** Raíz del JSON de formulario */
export interface FormularioConsultaJSONEntity extends Omit<FormularioJSONEntity, 'seccionesFormulario'> {
  seccionesFormularioConsulta: SeccionesFormularioEntity;
  //seccionesFormulario?: SeccionesFormularioEntity; // Mantener la propiedad original para compatibilidad
}
