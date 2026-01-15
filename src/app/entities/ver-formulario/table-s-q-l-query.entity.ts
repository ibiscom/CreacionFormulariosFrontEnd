import { ComponenteBaseEntity } from './componente-base.entity';
import { ValorStringEntity } from './valor-string.entity';

/** Componente TableSQLQueryEntity */
export interface TableSQLQueryEntity extends ComponenteBaseEntity {
  tipoComponente: 'TableSQLQuery' | string;
  idColumna: string;
  valor: ValorStringEntity;
  valorDefecto: ValorStringEntity;
  opciones: ValorStringEntity[];
  titles: string[];
  rows: { values: string[] }[];
}
