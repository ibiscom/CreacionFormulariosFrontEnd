import { ComponenteBaseEntity } from './componente-base.entity';
import { ValorStringEntity } from './valor-string.entity';

/** Componente InPutTextArea */
export interface InPutTextAreaEntity extends ComponenteBaseEntity {
  tipoComponente: 'InPutTextArea' | string;
  idColumna: string;
  valor: ValorStringEntity;
  valorDefecto: ValorStringEntity;
}
