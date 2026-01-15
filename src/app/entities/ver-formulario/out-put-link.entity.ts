import { ComponenteBaseEntity } from './componente-base.entity';
import { ValorStringEntity } from './valor-string.entity';

/** Componente OutPutLink */
export interface OutPutLinkEntity extends ComponenteBaseEntity {
  tipoComponente: 'OutPutLink' | string;
  idColumna: string;
  valor: ValorStringEntity;
  valorDefecto: ValorStringEntity;
}
