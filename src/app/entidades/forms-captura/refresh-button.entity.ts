import { ComponenteBaseEntity } from './componente-base.entity';
import { ValorBooleanEntity } from './valor-boolean.entity';
import { BooleanString } from './boolean-string.type';
import { ValidacionLogicaFiltroEntity } from './validacion-logica-filtro.entity';

/** Componente RefreshButton */
export interface RefreshButtonEntity extends ComponenteBaseEntity {
  tipoComponente: 'RefreshButton' | string;
  valor: ValorBooleanEntity;
  utilizaImagen: BooleanString;
  ubicacionImagen: string; // Ej: './images/VistaICO/PNG/Find.png'
  expresionLogicaFiltro: string; // Ej: '[FormulariosExternos][formname]=[formname]'
  validacionLogicaFiltro: ValidacionLogicaFiltroEntity;
  nombreEntidad: string; // Ej: 'FormulariosExternos'
  mostrarLink: BooleanString;
}
