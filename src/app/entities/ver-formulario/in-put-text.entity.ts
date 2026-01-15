import { ComponenteBaseEntity } from './componente-base.entity';
import { ValorStringEntity } from './valor-string.entity';

/** Componente InPutText */
export interface InPutTextEntity extends ComponenteBaseEntity {
  tipoComponente: 'InPutText' | string;
  idColumna: string;
  valor: ValorStringEntity;
  valorDefecto: ValorStringEntity;
}
