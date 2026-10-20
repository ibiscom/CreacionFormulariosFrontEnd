import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { CartaEntity } from '../../../entidades/plantillas/carta.entity';

/** Tamaño de hoja con sus dimensiones en puntos (PageSize de iText en el legado). */
export interface TamanoPaginaEntity {
  nombre: string;
  ancho: number;
  alto: number;
}

// Catálogos simulados: los microservicios de plantillas, series, tipos de documento
// e imágenes aún no existen.
const TAMANOS_PAGINA: TamanoPaginaEntity[] = [
  { nombre: 'LETTER', ancho: 612, alto: 792 },
  { nombre: 'LEGAL', ancho: 612, alto: 1008 },
  { nombre: 'EXECUTIVE', ancho: 522, alto: 756 },
  { nombre: 'TABLOID', ancho: 792, alto: 1224 },
  { nombre: 'A3', ancho: 842, alto: 1191 },
  { nombre: 'A4', ancho: 595, alto: 842 },
  { nombre: 'A5', ancho: 420, alto: 595 },
  { nombre: 'B4', ancho: 709, alto: 1001 },
  { nombre: 'B5', ancho: 499, alto: 709 },
];

const SERIES: string[] = ['SERIE-ADMIN', 'SERIE-CONTRATOS', 'SERIE-JURIDICA'];

const TIPOS_DOCUMENTO: string[] = ['Acta', 'Carta', 'Certificado', 'Resolución'];

const IMAGENES_EXISTENTES: string[] = ['encabezado-corporativo.png', 'pie-corporativo.png', 'logo-ibiscom.png'];

/** Métodos del formulario que retornan un Map de variables, por formulario. */
const METODOS_RETORNAN_MAP: Record<string, string[]> = {
  formPrincipal: ['getDatosGenerales', 'getTotalesLiquidacion'],
  formTerceros: ['getDatosTercero'],
  formDetalleMovimiento: ['getResumenMovimiento'],
};

const VARIABLES_POR_METODO: Record<string, string[]> = {
  getDatosGenerales: ['fechaGeneracion', 'usuarioGenera', 'consecutivo'],
  getTotalesLiquidacion: ['totalBruto', 'totalDescuentos', 'totalNeto'],
  getDatosTercero: ['razonSocial', 'documento', 'direccion'],
  getResumenMovimiento: ['cantidad', 'valorUnitario', 'subtotal'],
};

/** Campos de cada formulario, como los expondría getForm del backend. */
const COMPONENTES_POR_FORMULARIO: Record<string, string[]> = {
  formPrincipal: ['FormPlus|nombre', 'FormPlus|activo', 'FormPlus|fechaCreacion'],
  formTerceros: ['DummyEntityUno|descripcion', 'DummyEntityUno|cantidad'],
  formDetalleMovimiento: ['FormPlusDetalle|observaciones', 'FormPlusDetalle|fechaRegistro'],
  consultaTerceros: ['DummyEntityUno|descripcion', 'DummyEntityUno|vigente'],
  consultaMovimientos: ['FormPlusDetalle|observaciones'],
};

const PLANTILLAS: CartaEntity[] = [
  {
    idCarta: '1',
    nombreCarta: 'Carta de bienvenida',
    descripcionCarta: 'Plantilla base para notificar la creación de un registro',
    htmlCarta: '<p>Estimado <strong>[FormPlus|nombre]</strong>,</p><p>Su registro fue creado.</p>',
    nombreFormulario: 'formPrincipal',
    tipoFormulario: 'Captura',
    tamanoHoja: 'LETTER',
    generarPDF: 'true',
    generarWord: 'false',
    permitirFirma: 'false',
  },
];

@Injectable({ providedIn: 'root' })
export class CrearPlantillaService {
  private readonly latenciaSimuladaMs = 200;

  public getTamanosPagina(): Observable<TamanoPaginaEntity[]> {
    return of(TAMANOS_PAGINA).pipe(delay(this.latenciaSimuladaMs));
  }

  public getSeries(): Observable<string[]> {
    return of(SERIES).pipe(delay(this.latenciaSimuladaMs));
  }

  public getTiposDocumento(): Observable<string[]> {
    return of(TIPOS_DOCUMENTO).pipe(delay(this.latenciaSimuladaMs));
  }

  public getImagenesExistentes(): Observable<string[]> {
    return of(IMAGENES_EXISTENTES).pipe(delay(this.latenciaSimuladaMs));
  }

  public getComponentesFormulario(nombreFormulario: string): Observable<string[]> {
    return of(COMPONENTES_POR_FORMULARIO[nombreFormulario] ?? []).pipe(delay(this.latenciaSimuladaMs));
  }

  public getMetodosRetornanMap(nombreFormulario: string): Observable<string[]> {
    return of(METODOS_RETORNAN_MAP[nombreFormulario] ?? []).pipe(delay(this.latenciaSimuladaMs));
  }

  public getVariablesMetodo(metodo: string): Observable<string[]> {
    return of(VARIABLES_POR_METODO[metodo] ?? []).pipe(delay(this.latenciaSimuladaMs));
  }

  public getPlantillas(nombreFormulario: string): Observable<CartaEntity[]> {
    const plantillas = PLANTILLAS.filter((carta) => carta.nombreFormulario === nombreFormulario);
    return of(plantillas.map((carta) => ({ ...carta }))).pipe(delay(this.latenciaSimuladaMs));
  }

  public guardarPlantilla(carta: CartaEntity): Observable<string> {
    const existente = PLANTILLAS.find((item) => item.idCarta === carta.idCarta);
    if (existente) {
      Object.assign(existente, carta);
      return of('La plantilla ha sido actualizada').pipe(delay(this.latenciaSimuladaMs));
    }

    PLANTILLAS.push({ ...carta, idCarta: String(PLANTILLAS.length + 1) });
    return of('La plantilla ha sido guardada').pipe(delay(this.latenciaSimuladaMs));
  }

  public eliminarPlantilla(idCarta: string): Observable<string> {
    const indice = PLANTILLAS.findIndex((item) => item.idCarta === idCarta);
    if (indice >= 0) {
      PLANTILLAS.splice(indice, 1);
    }
    return of('La plantilla ha sido eliminada').pipe(delay(this.latenciaSimuladaMs));
  }

  /**
   * Genera la vista previa del documento. El legado produce el PDF con iText en el
   * servidor; aquí solo se confirma la solicitud hasta que exista el microservicio.
   */
  public generarPlantilla(carta: CartaEntity): Observable<string> {
    return of(`Generación solicitada para "${carta.nombreCarta || 'plantilla sin nombre'}".`).pipe(
      delay(this.latenciaSimuladaMs),
    );
  }
}
