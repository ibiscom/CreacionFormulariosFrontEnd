import { ComponenteBaseEntity } from './componente-base.entity';
import { ValorStringEntity } from './valor-string.entity';

/** Componente FileUp */
export interface FileUploadEntity extends ComponenteBaseEntity {
  tipoComponente: 'FileUpload' | string;
  idColumna: string;
  valor: ValorStringEntity;
  valorDefecto: ValorStringEntity;
}
