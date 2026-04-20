import { ComponenteBaseEntity } from './componente-base.entity';
import { ValorStringEntity } from './valor-string.entity';

/** Componente SelectInPutDate */
export interface SelectInPutDateEntity extends ComponenteBaseEntity {
  tipoComponente: 'SelectInPutDate' | string;
  idColumna: string;
  valor: ValorStringEntity;
  valorDefecto: ValorStringEntity;
}
