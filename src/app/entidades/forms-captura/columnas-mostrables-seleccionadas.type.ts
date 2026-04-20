import { BooleanString } from './boolean-string.type';

export interface ColumnasMostrablesSeleccionadasEntry {
  string?: string;
  boolean?: BooleanString;
}

export type ColumnasMostrablesSeleccionadas = Record<string, ColumnasMostrablesSeleccionadasEntry>;
