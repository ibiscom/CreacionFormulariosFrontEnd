import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { EntidadCatalogoEntity } from '../../../entidades/forms-captura/entidad-catalogo.entity';
import { ColumnaEntidadEntity } from '../../../entidades/forms-captura/columna-entidad.entity';
import { EntidadCatalogoService } from '../../captura/modelar-form-captura/entidad-catalogo.service';
import { SeleccionTablaService } from '../seleccion-tabla.service';
import { ReporteEntidadService } from '../reporte-entidad.service';

@Component({
  selector: 'app-seleccion-tabla',
  imports: [CommonModule, FormsModule],
  templateUrl: './seleccion-tabla.component.html',
  styleUrl: './seleccion-tabla.component.scss',
})
export class SeleccionTablaComponent implements OnInit {
  public mensaje = '';

  /** Catálogo completo; `entidades` es la vista filtrada que se pagina. */
  private entidadesCatalogo: EntidadCatalogoEntity[] = [];
  public entidades: EntidadCatalogoEntity[] = [];
  public entidadListSize = 10;
  public paginaActual = 0;
  public filtro = '';

  public entidadEscogida: EntidadCatalogoEntity | null = null;
  public entidadesRelacionadas: EntidadCatalogoEntity[] = [];
  /** Nombre de entidad relacionada -> si llega por una llave foránea obligatoria. */
  public entidadesRelacionadasObligatoriedad: Record<string, boolean> = {};

  public entidadRelacionadaEscogida: EntidadCatalogoEntity | null = null;
  public columnasEntidadRelacionada: ColumnaEntidadEntity[] = [];

  /** Marcaje de reporte de la entidad escogida: 'SI', 'NO' o '' si no está registrada. */
  public esReport = '';
  public readonly permitirReporteOpciones = ['SI', 'NO'];
  /** El legado oculta el bloque cuando la lista ya viene acotada a entidades-reporte. */
  public marcadoReporte = true;

  public constructor(
    private cdr: ChangeDetectorRef,
    private router: Router,
    private entidadCatalogoService: EntidadCatalogoService,
    private seleccionTablaService: SeleccionTablaService,
    private reporteEntidadService: ReporteEntidadService,
  ) {}

  public ngOnInit(): void {
    this.entidadCatalogoService.getEntidades().subscribe((entidades) => {
      this.entidadesCatalogo = entidades;
      this.entidades = entidades;
      this.cdr.detectChanges();
    });
  }

  // ---------------------------------------------------------------- Zona de entidades

  public get zonaTablasRelacionadas(): boolean {
    return !!this.entidadEscogida;
  }

  public get zonaColumnasEntidadRelacionada(): boolean {
    return !!this.entidadRelacionadaEscogida;
  }

  public get totalPaginas(): number {
    const tamano = this.getTamanoPagina();
    return Math.max(1, Math.ceil(this.entidades.length / tamano));
  }

  /** El legado valida el tamaño de página entre 1 y 100. */
  private getTamanoPagina(): number {
    const tamano = Number(this.entidadListSize);
    if (!Number.isFinite(tamano) || tamano < 1) {
      return 1;
    }
    return Math.min(100, Math.floor(tamano));
  }

  public getEntidadesPagina(): EntidadCatalogoEntity[] {
    const tamano = this.getTamanoPagina();
    const inicio = this.paginaActual * tamano;
    return this.entidades.slice(inicio, inicio + tamano);
  }

  public cambiarTamanoPagina(valor: string): void {
    this.entidadListSize = Number(valor);
    this.paginaActual = 0;
  }

  /** buscarEntidad del bean: filtra por nombre, y restaura el catálogo si el filtro va vacío. */
  public buscarEntidad(): void {
    const filtro = this.filtro.trim().toLowerCase();
    this.entidades = filtro
      ? this.entidadesCatalogo.filter((entidad) => entidad.nombre.toLowerCase().includes(filtro))
      : this.entidadesCatalogo;
    this.paginaActual = 0;
  }

  public irAPagina(pagina: number): void {
    if (pagina < 0 || pagina >= this.totalPaginas) {
      return;
    }
    this.paginaActual = pagina;
  }

  /** escucharEntidadSeleccionada del bean: abre la zona de relacionadas y cierra la de atributos. */
  public escucharEntidadSeleccionada(entidad: EntidadCatalogoEntity): void {
    this.mensaje = '';
    if (this.entidadEscogida?.nombre === entidad.nombre) {
      return;
    }

    this.entidadEscogida = entidad;
    this.entidadRelacionadaEscogida = null;
    this.columnasEntidadRelacionada = [];
    this.entidadesRelacionadasObligatoriedad = {};

    entidad.columnas
      .filter((columna) => columna.esLlaveForanea && columna.entidadRelacionada)
      .forEach((columna) => {
        const nombre = columna.entidadRelacionada as string;
        // Si varias foráneas apuntan a la misma entidad, basta con que una sea obligatoria.
        this.entidadesRelacionadasObligatoriedad[nombre] =
          this.entidadesRelacionadasObligatoriedad[nombre] || columna.obligatorio;
      });

    this.entidadCatalogoService.getEntidadesRelacionadas(entidad.nombre).subscribe((relacionadas) => {
      this.entidadesRelacionadas = relacionadas;
      this.cdr.detectChanges();
    });

    this.reporteEntidadService.obtenerDatosReporte(entidad.nombre).subscribe((reporte) => {
      this.esReport = reporte?.es_reporte ?? '';
      this.cdr.detectChanges();
    });
  }

  public get zonaPermitirReporte(): boolean {
    return this.zonaTablasRelacionadas && this.marcadoReporte;
  }

  public registrarReporteFormulario(): void {
    if (!this.entidadEscogida) {
      return;
    }

    this.reporteEntidadService
      .registrarReporteEntidad(this.entidadEscogida.nombre, this.esReport === 'SI')
      .subscribe((mensaje) => {
        this.mensaje = mensaje;
        this.cdr.detectChanges();
      });
  }

  public isEntidadSeleccionada(entidad: EntidadCatalogoEntity): boolean {
    return this.entidadEscogida?.nombre === entidad.nombre;
  }

  public escucharEntidadRelacionadaSeleccionada(entidad: EntidadCatalogoEntity): void {
    this.mensaje = '';
    this.entidadRelacionadaEscogida = entidad;
    this.columnasEntidadRelacionada = entidad.columnas;
  }

  public isEntidadRelacionadaSeleccionada(entidad: EntidadCatalogoEntity): boolean {
    return this.entidadRelacionadaEscogida?.nombre === entidad.nombre;
  }

  public isRelacionObligatoria(entidad: EntidadCatalogoEntity): boolean {
    return this.entidadesRelacionadasObligatoriedad[entidad.nombre] === true;
  }

  public getTipoDatoIcono(columna: ColumnaEntidadEntity): string {
    if (columna.esLlaveForanea) {
      return 'FK';
    }
    switch (columna.javaType) {
      case 'java.util.Date':
        return 'FEC';
      case 'java.lang.Boolean':
        return 'BOOL';
      case 'java.lang.Integer':
      case 'java.lang.Double':
        return 'NUM';
      default:
        return 'TXT';
    }
  }

  // ---------------------------------------------------------------- Creación de formularios

  public crearFormularioCaptura(): void {
    if (!this.registrarSeleccion()) {
      return;
    }
    this.router.navigate(['/captura/modelar-form-captura']);
  }

  public crearFormularioConsulta(): void {
    if (!this.registrarSeleccion()) {
      return;
    }
    this.router.navigate(['/consulta/modelar-form-consulta']);
  }

  /** El legado antepone la entidad principal a la lista de relacionadas antes de navegar. */
  private registrarSeleccion(): boolean {
    this.mensaje = '';
    if (!this.entidadEscogida) {
      this.mensaje = 'Debe seleccionar la entidad a la cual desea realizarle un formulario.';
      return false;
    }

    this.seleccionTablaService.establecerSeleccion({
      entidadPrincipal: this.entidadEscogida,
      entidadesRelacionadas: this.entidadesRelacionadas,
    });
    return true;
  }
}
