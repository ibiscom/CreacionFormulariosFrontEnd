import { ComponenteBaseEntity } from './componente-base.entity';

/** Contenedor de componentes de la sección (lado izquierdo según ejemplo) */
export interface ComponentesEntity {
  // Soporte a nombres de componentes de forma dinámica y nuevos tipos de componentes
  [key: string]: ComponenteBaseEntity | ComponenteBaseEntity[] | undefined;
}
