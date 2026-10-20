import { BooleanString } from './boolean-string.type';

/**
 * Refleja formulario.configuration.mail.Ruta del legado: un tramo del camino de
 * atributos que resuelve un parámetro del correo (ej. tercero.persona.email).
 */
export interface RutaMailEntity {
  nombreAtributo: string;
  separador: string;
  nombreClaseAtributo: string;
  javaType: BooleanString;
}
