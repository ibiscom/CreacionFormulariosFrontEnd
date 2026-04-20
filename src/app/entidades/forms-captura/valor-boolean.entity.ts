import { BooleanString } from './boolean-string.type';

/** Valor con clase 'boolean' y el valor en una clave vacía (tal como viene en el JSON) */
export interface ValorBooleanEntity {
  class: 'boolean';
  ''?: BooleanString;
}
