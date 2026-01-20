import { BooleanString } from './boolean-string.type';
import { SeccionesFormularioEntity } from './secciones-formulario.entity';
import { EntidadesEntity } from './entidades.entity';
import { EntidadesRelacionadasEntity } from './entidades-relacionadas.entity';
import { ComponentesEntity } from './componentes.entity';

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
}

/** Representa la nueva respuesta cruda del microservicio (array de objetos de una sola clave). */
export type FormularioJSONRawEntity = Array<Record<string, any>>;

/** Une un arreglo de objetos con una sola clave en un único objeto plano. */
function fusionarEntradasPropiedadUnica(entries: Array<Record<string, any>>): Record<string, any> {
  return entries.reduce((acc, entry) => {
    const [key, value] = Object.entries(entry)[0] ?? [];
    if (key) {
      acc[key] = value;
    }
    return acc;
  }, {} as Record<string, any>);
}

function normalizarValorComponente(value: any): any {
  if (Array.isArray(value) && value.length > 0 && Array.isArray(value[0])) {
    // Ej: InPutText: [ [ {"cambiado":...}, ...], [ {...} ] ]
    return value.map((componentEntries: any) =>
      Array.isArray(componentEntries) ? fusionarEntradasPropiedadUnica(componentEntries) : componentEntries,
    );
  }

  if (Array.isArray(value)) {
    // Ej: InPutTextArea: [ {"cambiado":...}, {...} ]
    return fusionarEntradasPropiedadUnica(value);
  }

  return value;
}

function normalizarComponentes(raw: any): ComponentesEntity | '' {
  if (raw === '' || raw === undefined) {
    return '';
  }

  if (!Array.isArray(raw)) {
    return raw as ComponentesEntity;
  }

  return raw.reduce((acc, entry) => {
    const [key, value] = Object.entries(entry)[0] ?? [];
    if (key) {
      acc[key] = normalizarValorComponente(value);
    }
    return acc;
  }, {} as ComponentesEntity);
}

function normalizarEntidades(raw: any): EntidadesEntity {
  if (!Array.isArray(raw)) {
    return (raw ?? {}) as EntidadesEntity;
  }

  const lista = raw.flatMap((entry: any) => {
    const valor = entry?.string;
    if (Array.isArray(valor)) {
      return valor;
    }
    if (typeof valor === 'string') {
      return [valor];
    }
    return [];
  });

  return lista.reduce((acc, valor, idx) => {
    acc[`string_${idx + 1}`] = valor;
    return acc;
  }, {} as EntidadesEntity);
}

function normalizarEntidadesRelacionadas(raw: any): EntidadesRelacionadasEntity {
  if (!Array.isArray(raw)) {
    return (raw ?? {}) as EntidadesRelacionadasEntity;
  }

  return raw.reduce((acc, entry, idx) => {
    const valor = entry?.string ?? '';
    acc[`string_${idx + 1}`] = valor;
    return acc;
  }, {} as EntidadesRelacionadasEntity);
}

function normalizarSeccionesFormulario(raw: any): SeccionesFormularioEntity {
  if (!Array.isArray(raw)) {
    return (raw ?? {}) as SeccionesFormularioEntity;
  }

  const seccionWrapper = raw.find((item) => 'Seccion' in item);
  const secciones = seccionWrapper?.Seccion ?? [];

  return secciones.reduce((acc: SeccionesFormularioEntity, seccionRaw: any, index: number) => {
    const seccionObj = Array.isArray(seccionRaw) ? fusionarEntradasPropiedadUnica(seccionRaw) : seccionRaw;
    acc[`Seccion_${index + 1}`] = {
      titulo: seccionObj?.titulo ?? '',
      descripcion: seccionObj?.descripcion ?? '',
      componentesIzq: normalizarComponentes(seccionObj?.componentesIzq ?? ''),
      componentesCent: normalizarComponentes(seccionObj?.componentesCent ?? ''),
      componentesDer: normalizarComponentes(seccionObj?.componentesDer ?? ''),
      guardado: (seccionObj?.guardado ?? 'false') as BooleanString,
      expandido: (seccionObj?.expandido ?? 'false') as BooleanString,
    };
    return acc;
  }, {} as SeccionesFormularioEntity);
}

/**
 * Normaliza la nueva respuesta del microservicio al contrato usado en el front.
 * Si el formato ya es el antiguo, simplemente lo retorna.
 */
export function normalizarFormularioJSON(
  raw: FormularioJSONEntity | FormularioJSONRawEntity,
): FormularioJSONEntity {
  if (!Array.isArray(raw)) {
    return raw;
  }

  const mergedRoot = fusionarEntradasPropiedadUnica(raw) as Record<string, any>;

  return {
    titulo: mergedRoot['titulo'] ?? '',
    descripcion: mergedRoot['descripcion'] ?? '',
    seccionesFormulario: normalizarSeccionesFormulario(mergedRoot['seccionesFormulario'] ?? []),
    entidades: normalizarEntidades(mergedRoot['entidades'] ?? []),
    entidadPrincipal: mergedRoot['entidadPrincipal'] ?? '',
    entidadesRelacionadas: normalizarEntidadesRelacionadas(mergedRoot['entidadesRelacionadas'] ?? []),
    nombreColumnasConsulta: mergedRoot['nombreColumnasConsulta'],
    nombresFormulariosLink: mergedRoot['nombresFormulariosLink'],
    links: mergedRoot['links'],
    idFormularioPadre: mergedRoot['idFormularioPadre'] ?? '',
    columnasForaneasSeleccionadas: mergedRoot['columnasForaneasSeleccionadas'],
    nuevo: (mergedRoot['nuevo'] ?? 'false') as BooleanString,
    edicion: (mergedRoot['edicion'] ?? 'false') as BooleanString,
    eliminable: (mergedRoot['eliminable'] ?? 'false') as BooleanString,
    diligenciable: (mergedRoot['diligenciable'] ?? 'false') as BooleanString,
    consultable: (mergedRoot['consultable'] ?? 'false') as BooleanString,
    plantillasMostrables: (mergedRoot['plantillasMostrables'] ?? 'false') as BooleanString,
  };
}
