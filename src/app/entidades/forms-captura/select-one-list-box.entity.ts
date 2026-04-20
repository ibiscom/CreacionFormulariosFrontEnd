import { ComponenteBaseEntity } from './componente-base.entity';
import { ValorStringEntity } from './valor-string.entity';

/** Componente SelectOneListBox */
export interface SelectOneListBoxEntity extends ComponenteBaseEntity {
  tipoComponente: 'SelectOneListBox' | string;
  idColumna: string;
  valor: ValorStringEntity;
  valorDefecto: ValorStringEntity;
}
