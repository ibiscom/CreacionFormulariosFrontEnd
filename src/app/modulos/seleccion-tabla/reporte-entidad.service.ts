import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ReporteEntidadEntity } from '../../entidades/forms-captura/reporte-entidad.entity';

// Registro simulado: el microservicio de ReporteEntidad (ServiciosReporteEntidad
// del legado) aún no existe, así que los marcajes viven en memoria.
const REPORTES_ENTIDAD: ReporteEntidadEntity[] = [
  { id_reporte_entidad: '1', nombre_entidad: 'FormPlus', es_reporte: 'SI' },
];

@Injectable({ providedIn: 'root' })
export class ReporteEntidadService {
  private readonly latenciaSimuladaMs = 200;

  /** Devuelve el marcaje de la entidad, o null si nunca se registró. */
  public obtenerDatosReporte(nombreEntidad: string): Observable<ReporteEntidadEntity | null> {
    const reporte = REPORTES_ENTIDAD.find((item) => item.nombre_entidad === nombreEntidad);
    return of(reporte ? { ...reporte } : null).pipe(delay(this.latenciaSimuladaMs));
  }

  /** Crea o actualiza el marcaje y devuelve el mensaje que el legado muestra al usuario. */
  public registrarReporteEntidad(nombreEntidad: string, esReporte: boolean): Observable<string> {
    const existente = REPORTES_ENTIDAD.find((item) => item.nombre_entidad === nombreEntidad);
    const es_reporte: 'SI' | 'NO' = esReporte ? 'SI' : 'NO';

    if (existente) {
      existente.es_reporte = es_reporte;
      return of('La entidad ha sido modificada').pipe(delay(this.latenciaSimuladaMs));
    }

    REPORTES_ENTIDAD.push({
      id_reporte_entidad: String(REPORTES_ENTIDAD.length + 1),
      nombre_entidad: nombreEntidad,
      es_reporte,
    });
    return of('La entidad ha sido registrada').pipe(delay(this.latenciaSimuladaMs));
  }
}
