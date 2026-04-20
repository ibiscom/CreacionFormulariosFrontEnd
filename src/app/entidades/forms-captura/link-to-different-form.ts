import { ComponenteBaseEntity } from './componente-base.entity';
import { ValorStringEntity } from './valor-string.entity';

/** Componente LinkToDifferentForm */
export interface LinkToDifferentFormEntity extends ComponenteBaseEntity {
  tipoComponente: 'LinkToDifferentForm' | string;
  idColumna: string;
  valor: ValorStringEntity;
  valorDefecto: ValorStringEntity;
}
