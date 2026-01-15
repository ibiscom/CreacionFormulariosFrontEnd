import { ComponenteBaseEntity } from './componente-base.entity';
import { ValorStringEntity } from './valor-string.entity';

/** Componente LabelEntity */
export interface LabelEntity extends ComponenteBaseEntity {
  tipoComponente: 'Label' | string;
  idColumna: string;
  valor: ValorStringEntity;
  valorDefecto: ValorStringEntity;
}
