import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ValidacionExpresionRegularEntity } from '../../../entidades/forms-captura/validacion-expresion-regular.entity';

// Catálogos simulados: los microservicios de estilos, formularios, clases de carga
// y validaciones reutilizables aún no existen.
const ESTILOS_COMPONENTE: string[] = [
  'InPutText',
  'InPutTextArea',
  'InPutRichText',
  'SelectInPutDate',
  'SelectBooleanCheckBox',
  'SelectOneListBox',
  'SelectOneRadioButton',
  'TablaDetalles',
  'Label',
  'Separador',
  'estiloResaltado',
  'estiloCompacto',
];

const CLASES_CARGA_MASIVA: string[] = [
  'logica.cargamasiva.CargaGenerica',
  'logica.cargamasiva.CargaTerceros',
  'logica.cargamasiva.CargaMovimientos',
];

const FORMULARIOS_CAPTURA: string[] = ['formPrincipal', 'formTerceros', 'formDetalleMovimiento'];

const FORMULARIOS_CONSULTA: string[] = ['consultaTerceros', 'consultaMovimientos'];

const TIPOS_ORDENAMIENTO_TABLA: string[] = ['Ascendente', 'Descendente', 'Sin ordenamiento'];

const VALIDACIONES_BD: ValidacionExpresionRegularEntity[] = [
  {
    nombre: 'Correo electrónico',
    ejemplo: 'usuario@dominio.com',
    entrada: '',
    expresion: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}',
    mensajeValidacion: 'El correo electrónico no tiene un formato válido',
    cumple: false,
  },
  {
    nombre: 'Solo números',
    ejemplo: '12345',
    entrada: '',
    expresion: '[0-9]+',
    mensajeValidacion: 'El campo solo admite números',
    cumple: false,
  },
  {
    nombre: 'Teléfono',
    ejemplo: '3001234567',
    entrada: '',
    expresion: '[0-9]{7,10}',
    mensajeValidacion: 'El teléfono debe tener entre 7 y 10 dígitos',
    cumple: false,
  },
];

@Injectable({ providedIn: 'root' })
export class ModeladorCatalogoService {
  private readonly latenciaSimuladaMs = 200;

  public getEstilosComponente(): Observable<string[]> {
    return of(ESTILOS_COMPONENTE).pipe(delay(this.latenciaSimuladaMs));
  }

  public getClasesCargaMasiva(): Observable<string[]> {
    return of(CLASES_CARGA_MASIVA).pipe(delay(this.latenciaSimuladaMs));
  }

  public getFormularios(): Observable<string[]> {
    return of(FORMULARIOS_CAPTURA).pipe(delay(this.latenciaSimuladaMs));
  }

  public getFormulariosConsulta(): Observable<string[]> {
    return of(FORMULARIOS_CONSULTA).pipe(delay(this.latenciaSimuladaMs));
  }

  public getTiposOrdenamientoTabla(): Observable<string[]> {
    return of(TIPOS_ORDENAMIENTO_TABLA).pipe(delay(this.latenciaSimuladaMs));
  }

  public getValidacionesBD(): Observable<ValidacionExpresionRegularEntity[]> {
    return of(VALIDACIONES_BD.map((validacion) => ({ ...validacion }))).pipe(delay(this.latenciaSimuladaMs));
  }

  public guardarValidacionesBD(validaciones: ValidacionExpresionRegularEntity[]): Observable<string> {
    validaciones
      .filter((validacion) => !VALIDACIONES_BD.some((item) => item.nombre === validacion.nombre))
      .forEach((validacion) => VALIDACIONES_BD.push({ ...validacion }));

    return of('Validaciones guardadas en el catálogo simulado.').pipe(delay(this.latenciaSimuladaMs));
  }
}
