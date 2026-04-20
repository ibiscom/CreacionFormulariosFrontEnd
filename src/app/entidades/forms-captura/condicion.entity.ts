import type { ComponenteBaseEntity } from './componente-base.entity';

export interface CondicionEntity {
  identificador: string;
  atributo: string;
  componente: ComponenteBaseEntity;
  tipoCondicion: string;
}
