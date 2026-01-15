import { BooleanString } from './boolean-string.type';
import { AtributoAEDEntity } from './atributo-aed.entity';

/** Estructura de la validación lógica usada por SearchButton */
export interface ValidacionLogicaFiltroEntity {
  esNodoOperador: BooleanString;
  hijoIzqAtributoAED: AtributoAEDEntity;
  esNodoRaiz: BooleanString;
  mensajeError: string;
}
