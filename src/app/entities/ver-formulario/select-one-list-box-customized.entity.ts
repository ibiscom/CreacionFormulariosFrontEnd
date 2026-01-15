import { ComponenteBaseEntity } from './componente-base.entity';
import { ValorStringEntity } from './valor-string.entity';

/** Componente SelectOneListBoxCustomized */
export interface SelectOneListBoxCustomizedEntity extends ComponenteBaseEntity {
  tipoComponente: 'SelectOneListBoxCustomized' | string;
  idColumna: string;
  valor: any;
  valorDefecto: any;
  opciones: any[];
}
