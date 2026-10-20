/**
 * Refleja ReporteEntidad del legado: marca si una entidad de la base de datos está
 * habilitada como reporte. Se conservan los nombres del contrato Java (snake_case).
 */
export interface ReporteEntidadEntity {
  id_reporte_entidad?: string;
  nombre_entidad: string;
  es_reporte: 'SI' | 'NO';
}
