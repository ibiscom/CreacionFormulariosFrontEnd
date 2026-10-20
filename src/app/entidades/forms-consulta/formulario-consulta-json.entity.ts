import { BooleanString } from '../forms-captura/boolean-string.type';
import { FormularioJSONEntity } from '../forms-captura/formulario-json.entity';
import { SeccionesFormularioConsultaEntity } from './secciones-formulario-consulta.entity';

/** Raíz del JSON de formulario de consulta (FormularioConsulta.java) */
export interface FormularioConsultaJSONEntity extends Omit<FormularioJSONEntity, 'seccionesFormulario'> {
  seccionesFormularioConsulta: SeccionesFormularioConsultaEntity;

  /** Formulario de captura que se abre al seleccionar un registro del resultado. */
  nombreFormularioVisualizacion?: string;
  permitirGraficas?: BooleanString;

  /** Columnas del resultado: atributos elegidos, su orden y sus títulos. */
  nombresColumnasTabla?: string[];
  nombresColumnasOrganizadas?: string[];
  nombresColumnas?: { [columna: string]: string };
  formatosColumnas?: { [columna: string]: string };
  posicionesNombres?: { [columna: string]: string };
  nombresColumnasRelacionadasMostrar?: { [columna: string]: string[] };

  /** Consulta generada y su paginación. */
  query?: string;
  querySize?: string;
  where?: string;
  pageSize?: string;
  listaNombresAtributos?: string[];
}
