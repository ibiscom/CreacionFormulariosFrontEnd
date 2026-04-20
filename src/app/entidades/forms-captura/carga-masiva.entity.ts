import { ComponenteBaseEntity } from './componente-base.entity';
import { ValorStringEntity } from './valor-string.entity';

/** Componente CargaMasiva */
export interface CargaMasivaEntity extends ComponenteBaseEntity {
  tipoComponente: 'CargaMasiva' | string;
  idColumna: string;
  valor: ValorStringEntity;
  valorDefecto: ValorStringEntity;
}
