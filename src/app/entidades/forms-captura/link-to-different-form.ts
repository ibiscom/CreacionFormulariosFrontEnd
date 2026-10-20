import { BooleanString } from './boolean-string.type';
import { ComponenteBaseEntity } from './componente-base.entity';
import { ValorStringEntity } from './valor-string.entity';

/** Componente LinkToDifferentForm */
export interface LinkToDifferentFormEntity extends ComponenteBaseEntity {
  tipoComponente: 'LinkToDifferentForm' | string;
  idColumna: string;
  valor: ValorStringEntity;
  valorDefecto: ValorStringEntity;

  /** Formularios destino del link (LinkToDifferentForm.java). */
  nombresFormularios?: string[];
  /** Paralelo a nombresFormularios: true = formulario de consulta. */
  tipoFormulario?: BooleanString[];
  /** Clave "<nombreFormulario><esConsulta>" -> posición dentro de nombresFormularios. */
  posicionFormulario?: { [clave: string]: string };
  /** Método del backend que valida y selecciona a qué formulario dirigir. */
  nombreRutina?: string;
}
