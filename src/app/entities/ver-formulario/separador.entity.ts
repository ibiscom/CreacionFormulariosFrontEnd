import { ComponenteBaseEntity } from './componente-base.entity';
import { ValorStringEntity } from './valor-string.entity';

/** Componente Separador */
export interface SeparadorEntity extends ComponenteBaseEntity {
  tipoComponente: 'Separador' | string;
  idColumna: string;
  valor: ValorStringEntity;
  valorDefecto: ValorStringEntity;
}
