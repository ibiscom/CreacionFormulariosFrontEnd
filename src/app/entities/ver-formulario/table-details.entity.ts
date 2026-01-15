import { ComponenteBaseEntity } from './componente-base.entity';
import { ValorStringEntity } from './valor-string.entity';

/** Componente TableDetailsEntity */
export interface TableDetailsEntity extends ComponenteBaseEntity {
  tipoComponente: 'TablaDetalle' | string;
  idColumna: string;
  valor: ValorStringEntity;
  valorDefecto: ValorStringEntity;
  opciones: ValorStringEntity[];
  titulos: string[];
  columnas: { valores: string[] }[];
}
