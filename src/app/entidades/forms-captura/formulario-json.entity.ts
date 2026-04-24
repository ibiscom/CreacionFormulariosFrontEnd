import { BooleanString } from './boolean-string.type';
import { SeccionesFormularioEntity } from './secciones-formulario.entity';
import { EntidadesEntity } from './entidades.entity';
import { EntidadesRelacionadasEntity } from './entidades-relacionadas.entity';

/** Raíz del JSON de formulario */
export interface FormularioJSONEntity {
  titulo: string;
  descripcion: string;
  seccionesFormulario: SeccionesFormularioEntity;
  entidades: EntidadesEntity;
  entidadPrincipal: string; // Ej: 'FormPlus'
  entidadesRelacionadas: EntidadesRelacionadasEntity; // Ej: { string: 'FormulariosExternos' }
  nombreColumnasConsulta?: string;
  nombresFormulariosLink?: string;
  links?: string;
  idFormularioPadre: string; // Ej: 'vacio'
  columnasForaneasSeleccionadas?: string;
  nuevo: BooleanString;
  edicion: BooleanString;
  eliminable: BooleanString;
  diligenciable: BooleanString;
  consultable: BooleanString;
  plantillasMostrables: BooleanString;
  htmlAyuda?: string; // Nuevo campo para almacenar el contenido de ayuda en formato HTML
}
