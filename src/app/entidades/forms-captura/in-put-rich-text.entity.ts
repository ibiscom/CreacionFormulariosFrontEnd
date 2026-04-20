import { ComponenteBaseEntity } from './componente-base.entity';
import { ValorStringEntity } from './valor-string.entity';

/** Componente InPutRichText */
export interface InPutRichTextEntity extends ComponenteBaseEntity {
  tipoComponente: 'InPutRichText' | string;
  idColumna: string;
  valor: ValorStringEntity;
  valorDefecto: ValorStringEntity;
}
