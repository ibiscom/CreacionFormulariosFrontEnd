import { ComponenteBaseEntity } from './componente-base.entity';
import { ValorStringEntity } from './valor-string.entity';

/** Componente ListaCompuesta */
export interface ListaCompuestaEntity extends ComponenteBaseEntity {
  tipoComponente: 'ListaCompuesta' | string;
  idColumna: string;
  valor: ValorStringEntity;
  valorDefecto: ValorStringEntity;
}
