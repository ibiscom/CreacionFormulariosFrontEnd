import { ColumnaEntidadEntity } from './columna-entidad.entity';

/** Refleja model.datamodel.Entity del bean legado: una tabla/entidad del catálogo, con sus columnas. */
export interface EntidadCatalogoEntity {
  nombre: string;
  columnas: ColumnaEntidadEntity[];
}
