import { ComponenteBaseEntity } from './componente-base.entity';
import { ValorStringEntity } from './valor-string.entity';

/** Componente LinkToAForm */
export interface LinkToAFormEntity extends ComponenteBaseEntity {
  tipoComponente: 'LinkToAForm' | string;
  idColumna: string;
  valor: ValorStringEntity;
  valorDefecto: ValorStringEntity;
}
