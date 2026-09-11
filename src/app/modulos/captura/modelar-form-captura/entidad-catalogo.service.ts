import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { EntidadCatalogoEntity } from '../../../entidades/forms-captura/entidad-catalogo.entity';

// Catálogo simulado: el microservicio real de entidades/atributos aún no está disponible.
const CATALOGO_ENTIDADES: EntidadCatalogoEntity[] = [
  {
    nombre: 'FormPlus',
    columnas: [
      { nombre: 'id', javaType: 'java.lang.Integer', obligatorio: true, esLlavePrimaria: true, esLlaveForanea: false },
      { nombre: 'nombre', javaType: 'java.lang.String', obligatorio: true, esLlavePrimaria: false, esLlaveForanea: false },
      { nombre: 'activo', javaType: 'java.lang.Boolean', obligatorio: false, esLlavePrimaria: false, esLlaveForanea: false },
      { nombre: 'fechaCreacion', javaType: 'java.util.Date', obligatorio: false, esLlavePrimaria: false, esLlaveForanea: false },
      {
        nombre: 'tipoDocumento',
        javaType: 'java.lang.Integer',
        obligatorio: true,
        esLlavePrimaria: false,
        esLlaveForanea: true,
        tipoRelacion: 'ManyToOne',
        entidadRelacionada: 'TipoDocumento',
      },
      {
        nombre: 'datosExtendidos',
        javaType: 'java.lang.Integer',
        obligatorio: false,
        esLlavePrimaria: false,
        esLlaveForanea: true,
        tipoRelacion: 'UnoAUno',
        entidadRelacionada: 'FormPlusDetalle',
      },
    ],
  },
  {
    nombre: 'DummyEntityUno',
    columnas: [
      { nombre: 'id', javaType: 'java.lang.Integer', obligatorio: true, esLlavePrimaria: true, esLlaveForanea: false },
      { nombre: 'descripcion', javaType: 'java.lang.String', obligatorio: true, esLlavePrimaria: false, esLlaveForanea: false },
      { nombre: 'cantidad', javaType: 'java.lang.Integer', obligatorio: false, esLlavePrimaria: false, esLlaveForanea: false },
      { nombre: 'vigente', javaType: 'java.lang.Boolean', obligatorio: false, esLlavePrimaria: false, esLlaveForanea: false },
    ],
  },
  {
    nombre: 'FormPlusDetalle',
    columnas: [
      { nombre: 'id', javaType: 'java.lang.Integer', obligatorio: true, esLlavePrimaria: true, esLlaveForanea: false },
      { nombre: 'observaciones', javaType: 'java.lang.String', obligatorio: false, esLlavePrimaria: false, esLlaveForanea: false },
      { nombre: 'fechaRegistro', javaType: 'java.util.Date', obligatorio: false, esLlavePrimaria: false, esLlaveForanea: false },
    ],
  },
];

@Injectable({ providedIn: 'root' })
export class EntidadCatalogoService {
  private readonly latenciaSimuladaMs = 200;

  public getNombresEntidadesPrincipales(): Observable<string[]> {
    return of(CATALOGO_ENTIDADES.map((entidad) => entidad.nombre)).pipe(delay(this.latenciaSimuladaMs));
  }

  public getEntidadPorNombre(nombre: string): Observable<EntidadCatalogoEntity | undefined> {
    return of(CATALOGO_ENTIDADES.find((entidad) => entidad.nombre === nombre)).pipe(delay(this.latenciaSimuladaMs));
  }

  public getEntidadesRelacionadasUnoAUno(nombreEntidadPrincipal: string): Observable<EntidadCatalogoEntity[]> {
    const principal = CATALOGO_ENTIDADES.find((entidad) => entidad.nombre === nombreEntidadPrincipal);
    const nombresRelacionados = (principal?.columnas ?? [])
      .filter((columna) => columna.esLlaveForanea && columna.tipoRelacion === 'UnoAUno' && columna.entidadRelacionada)
      .map((columna) => columna.entidadRelacionada as string);

    const relacionadas = CATALOGO_ENTIDADES.filter((entidad) => nombresRelacionados.includes(entidad.nombre));
    return of(relacionadas).pipe(delay(this.latenciaSimuladaMs));
  }
}
