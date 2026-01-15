import { ComponenteBaseEntity } from './componente-base.entity';
import { ValorStringEntity } from './valor-string.entity';

/** Componente LinkFormToIcefacesEntity */
export interface LinkFormToIcefacesEntity extends ComponenteBaseEntity {
  tipoComponente: 'LinkFormToIcefaces' | string;
  idColumna: string;
  valor: ValorStringEntity;
  valorDefecto: ValorStringEntity;
}
