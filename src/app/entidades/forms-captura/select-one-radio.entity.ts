import { ComponenteBaseEntity } from './componente-base.entity';
import { ValorStringEntity } from './valor-string.entity';

/** Componente SelectOneRadio */
export interface SelectOneRadioEntity extends ComponenteBaseEntity {
  tipoComponente: 'SelectOneRadio' | string;
  idColumna: string;
  valor: ValorStringEntity;
  valorDefecto: ValorStringEntity;
  opciones: ValorStringEntity[];
}
