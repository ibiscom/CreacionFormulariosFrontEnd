/** Refleja model.datamodel.Column del bean legado: una columna/atributo de una entidad del catálogo. */
export interface ColumnaEntidadEntity {
  nombre: string;
  javaType: 'java.lang.String' | 'java.lang.Integer' | 'java.lang.Double' | 'java.lang.Boolean' | 'java.util.Date';
  obligatorio: boolean;
  esLlavePrimaria: boolean;
  esLlaveForanea: boolean;
  tipoRelacion?: 'ManyToOne' | 'OneToMany' | 'ManyToMany' | 'UnoAUno';
  entidadRelacionada?: string;
}
