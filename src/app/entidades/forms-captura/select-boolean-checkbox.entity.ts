import { ComponenteBaseEntity } from './componente-base.entity';
import { ValorBooleanEntity } from './valor-boolean.entity';
import { ValorStringEntity } from './valor-string.entity';

/** Componente SelectBooleanCheckBox */
export interface SelectBooleanCheckBoxEntity extends ComponenteBaseEntity {
  tipoComponente: 'SelectBooleanCheckBox' | string;
  idColumna: string;
  valor: ValorBooleanEntity;
  valorDefecto: ValorBooleanEntity;
}
