import { ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { CartaEntity } from '../../../../entidades/plantillas/carta.entity';
import { ModeladorCatalogoService } from '../../../captura/modelar-form-captura/modelador-catalogo.service';
import { CrearPlantillaService, TamanoPaginaEntity } from '../crear-plantilla.service';

@Component({
  selector: 'app-crear-plantilla',
  imports: [CommonModule, FormsModule, CKEditorModule],
  templateUrl: './crear-plantilla.component.html',
  styleUrl: './crear-plantilla.component.scss',
  host: { ngSkipHydration: '' },
})
export class CrearPlantillaComponent implements OnInit {
  public mensajes: string[] = [];

  /** Cuerpo de la plantilla en edición. */
  public html = '';
  public editor: unknown;
  public editorConfig: Record<string, unknown> = { language: 'es', licenseKey: 'GPL' };
  public isBrowser = false;

  // ---- Zona de variables
  public readonly tipoFormValues = ['Captura', 'Consulta'];
  public tipoForm: 'Captura' | 'Consulta' = 'Captura';
  public listaFormularios: string[] = [];
  public nombreFormulario = '';
  public listaComponentes: string[] = [];
  public idComponente = '';
  public listaMetodosRetornanMap: string[] = [];
  public metodoSeleccionado = '';
  public listaVariablesMap: string[] = [];
  public variableSeleccionada = '';
  public listaSeries: string[] = [];
  public serieSeleccionada = '';
  public listaTiposDoc: string[] = [];
  public tipoDocumentoSeleccionado = '';

  private formulariosCaptura: string[] = [];
  private formulariosConsulta: string[] = [];

  // ---- Datos de la plantilla
  public nombreCarta = '';
  public descripcionCarta = '';
  public generarPDF = false;
  public generarWord = false;
  public permitirFirma = false;

  /** Orientación / tipo de hoja de la previsualización. */
  public tipoHoja = 'letter';
  public readonly tiposHoja = [
    { valor: 'letter', etiqueta: 'Carta' },
    { valor: 'portrait', etiqueta: 'Retrato' },
    { valor: 'inherit', etiqueta: 'Inherit' },
    { valor: 'landscape', etiqueta: 'Landscape' },
    { valor: 'auto', etiqueta: 'Auto' },
  ];

  public cartas: CartaEntity[] = [];
  public cartaEnEdicion: CartaEntity | null = null;

  // ---- Configuración de página
  public mostrarVentanaConfiguracion = false;
  public tamanosPagina: TamanoPaginaEntity[] = [];
  public tamanoCarta = 'LETTER';
  public margenArriba = '70';
  public margenAbajo = '70';
  public margenDerecha = '55';
  public margenIzquierda = '55';
  public maxMargenAncho: string[] = [];
  public maxMargenAlto: string[] = [];

  public imagenesExistentes: string[] = [];
  /** Escalas de 10% a 500%, como cargarPorcentajesEscala del legado. */
  public readonly porcentajesEscala = Array.from({ length: 491 }, (_, index) => String(index + 10));

  public utilizaEncabezadoExistente = false;
  public nombreEncabezado = '';
  public anchoEncabezado = '0';
  public altoEncabezado = '0';

  public utilizaPiePaginaExistente = false;
  public nombrePiePagina = '';
  public anchoPiePagina = '0';
  public altoPiePagina = '0';

  public constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdr: ChangeDetectorRef,
    private crearPlantillaService: CrearPlantillaService,
    private modeladorCatalogoService: ModeladorCatalogoService,
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  public async ngOnInit(): Promise<void> {
    this.modeladorCatalogoService.getFormularios().subscribe((formularios) => {
      this.formulariosCaptura = formularios;
      this.actualizarListaFormularios();
      this.cdr.detectChanges();
    });
    this.modeladorCatalogoService.getFormulariosConsulta().subscribe((formularios) => {
      this.formulariosConsulta = formularios;
      this.actualizarListaFormularios();
      this.cdr.detectChanges();
    });
    this.crearPlantillaService.getSeries().subscribe((series) => {
      this.listaSeries = series;
      this.cdr.detectChanges();
    });
    this.crearPlantillaService.getTiposDocumento().subscribe((tipos) => {
      this.listaTiposDoc = tipos;
      this.cdr.detectChanges();
    });
    this.crearPlantillaService.getImagenesExistentes().subscribe((imagenes) => {
      this.imagenesExistentes = imagenes;
      this.cdr.detectChanges();
    });
    this.crearPlantillaService.getTamanosPagina().subscribe((tamanos) => {
      this.tamanosPagina = tamanos;
      this.cambiarTamanoPagina(this.tamanoCarta);
      this.cdr.detectChanges();
    });

    if (this.isBrowser) {
      try {
        const { default: ClassicEditor } = await import('@ckeditor/ckeditor5-build-classic');
        this.editor = ClassicEditor;
      } catch (err) {
        console.error('CKEditor load failed, falling back to textarea', err);
        this.editor = undefined;
      }
    }
  }

  // ---------------------------------------------------------------- Zona de variables

  private actualizarListaFormularios(): void {
    this.listaFormularios = this.tipoForm === 'Consulta' ? this.formulariosConsulta : this.formulariosCaptura;
  }

  public escucharCambioTipo(tipo: 'Captura' | 'Consulta'): void {
    this.tipoForm = tipo;
    this.nombreFormulario = '';
    this.listaComponentes = [];
    this.idComponente = '';
    this.listaMetodosRetornanMap = [];
    this.metodoSeleccionado = '';
    this.listaVariablesMap = [];
    this.cartas = [];
    this.actualizarListaFormularios();
  }

  public cambiarFormulario(nombre: string): void {
    this.nombreFormulario = nombre;
    this.idComponente = '';
    this.metodoSeleccionado = '';
    this.listaVariablesMap = [];

    if (!nombre) {
      this.listaComponentes = [];
      this.listaMetodosRetornanMap = [];
      this.cartas = [];
      return;
    }

    this.crearPlantillaService.getComponentesFormulario(nombre).subscribe((componentes) => {
      this.listaComponentes = componentes;
      this.cdr.detectChanges();
    });
    this.crearPlantillaService.getMetodosRetornanMap(nombre).subscribe((metodos) => {
      this.listaMetodosRetornanMap = metodos;
      this.cdr.detectChanges();
    });
    this.crearPlantillaService.getPlantillas(nombre).subscribe((cartas) => {
      this.cartas = cartas;
      this.cdr.detectChanges();
    });
  }

  public cambiarMetodo(metodo: string): void {
    this.metodoSeleccionado = metodo;
    this.variableSeleccionada = '';

    if (!metodo) {
      this.listaVariablesMap = [];
      return;
    }

    this.crearPlantillaService.getVariablesMetodo(metodo).subscribe((variables) => {
      this.listaVariablesMap = variables;
      this.cdr.detectChanges();
    });
  }

  public get idNotEmpty(): boolean {
    return !!this.idComponente;
  }

  public get metodoNotEmpty(): boolean {
    return !!this.metodoSeleccionado;
  }

  /** Agrega el token de la variable al final del cuerpo de la plantilla. */
  public insertarVariable(token: string): void {
    if (!token) {
      return;
    }
    this.html = `${this.html}[${token}]`;
  }

  public nuevaBusqueda(): void {
    this.escucharCambioTipo(this.tipoForm);
    this.limpiarCampos();
  }

  // ---------------------------------------------------------------- Plantillas

  public escucharListaCartas(carta: CartaEntity): void {
    this.cartaEnEdicion = carta;
    this.nombreCarta = carta.nombreCarta;
    this.descripcionCarta = carta.descripcionCarta;
    this.html = carta.htmlCarta;
    this.tamanoCarta = carta.tamanoHoja ?? 'LETTER';
    this.generarPDF = carta.generarPDF === 'true';
    this.generarWord = carta.generarWord === 'true';
    this.permitirFirma = carta.permitirFirma === 'true';
    this.serieSeleccionada = carta.serie ?? '';
    this.tipoDocumentoSeleccionado = carta.tipoDocumento ?? '';
    this.cambiarTamanoPagina(this.tamanoCarta);
  }

  public get editandoCarta(): boolean {
    return !!this.cartaEnEdicion;
  }

  private construirCarta(): CartaEntity {
    return {
      idCarta: this.cartaEnEdicion?.idCarta,
      nombreCarta: this.nombreCarta,
      descripcionCarta: this.descripcionCarta,
      htmlCarta: this.html,
      nombreFormulario: this.nombreFormulario,
      tipoFormulario: this.tipoForm,
      tamanoHoja: this.tamanoCarta,
      margenArriba: this.margenArriba,
      margenAbajo: this.margenAbajo,
      margenIzquierdo: this.margenIzquierda,
      margenDerecho: this.margenDerecha,
      imagenEncabezado: this.nombreEncabezado ? { nombre: this.nombreEncabezado } : undefined,
      imagenPiePagina: this.nombrePiePagina ? { nombre: this.nombrePiePagina } : undefined,
      anchoEncabezado: this.anchoEncabezado,
      altoEncabezado: this.altoEncabezado,
      anchoPiePagina: this.anchoPiePagina,
      altoPiePagina: this.altoPiePagina,
      generarPDF: this.generarPDF ? 'true' : 'false',
      generarWord: this.generarWord ? 'true' : 'false',
      permitirFirma: this.permitirFirma ? 'true' : 'false',
      serie: this.serieSeleccionada,
      tipoDocumento: this.tipoDocumentoSeleccionado,
    };
  }

  private validarPlantilla(): boolean {
    this.mensajes = [];
    if (!this.nombreFormulario) {
      this.agregarMensaje('Seleccione el formulario al que pertenece la plantilla.');
      return false;
    }
    if (!this.nombreCarta) {
      this.agregarMensaje('Digite la etiqueta de la plantilla.');
      return false;
    }
    if (!this.html.trim()) {
      this.agregarMensaje('La plantilla no tiene contenido.');
      return false;
    }
    return true;
  }

  public guardarCarta(): void {
    if (!this.validarPlantilla()) {
      return;
    }

    this.crearPlantillaService.guardarPlantilla(this.construirCarta()).subscribe((mensaje) => {
      this.agregarMensaje(mensaje);
      this.recargarPlantillas();
    });
  }

  public eliminarCarta(carta: CartaEntity): void {
    if (!carta.idCarta) {
      return;
    }

    this.crearPlantillaService.eliminarPlantilla(carta.idCarta).subscribe((mensaje) => {
      this.agregarMensaje(mensaje);
      if (this.cartaEnEdicion?.idCarta === carta.idCarta) {
        this.limpiarCampos();
      }
      this.recargarPlantillas();
    });
  }

  public generarPlantilla(): void {
    if (!this.validarPlantilla()) {
      return;
    }

    this.crearPlantillaService.generarPlantilla(this.construirCarta()).subscribe((mensaje) => {
      this.agregarMensaje(mensaje);
      this.cdr.detectChanges();
    });
  }

  public limpiarCampos(): void {
    this.cartaEnEdicion = null;
    this.nombreCarta = '';
    this.descripcionCarta = '';
    this.html = '';
    this.generarPDF = false;
    this.generarWord = false;
    this.permitirFirma = false;
    this.serieSeleccionada = '';
    this.tipoDocumentoSeleccionado = '';
  }

  private recargarPlantillas(): void {
    if (!this.nombreFormulario) {
      return;
    }
    this.crearPlantillaService.getPlantillas(this.nombreFormulario).subscribe((cartas) => {
      this.cartas = cartas;
      this.cdr.detectChanges();
    });
  }

  private agregarMensaje(mensaje: string): void {
    this.mensajes = [mensaje, ...this.mensajes].slice(0, 5);
  }

  // ---------------------------------------------------------------- Configuración de página

  public abrirVentanaConfiguracion(): void {
    this.mostrarVentanaConfiguracion = true;
  }

  public cerrarVentanaConfiguracion(): void {
    this.mostrarVentanaConfiguracion = false;
  }

  public guardarCambiosConfiguracion(): void {
    this.mostrarVentanaConfiguracion = false;
    this.agregarMensaje('Configuración de página aplicada a la plantilla.');
  }

  /** cambiarTamanoPagina del bean: los márgenes llegan hasta la mitad de la hoja. */
  public cambiarTamanoPagina(nombreTamano: string): void {
    this.tamanoCarta = nombreTamano;
    const tamano = this.tamanosPagina.find((item) => item.nombre === nombreTamano);
    if (!tamano) {
      return;
    }

    this.maxMargenAncho = this.construirRangoMargen(tamano.ancho / 2);
    this.maxMargenAlto = this.construirRangoMargen(tamano.alto / 2);
  }

  private construirRangoMargen(maximo: number): string[] {
    const tope = Math.floor(maximo);
    if (tope <= 10) {
      return ['10'];
    }
    return Array.from({ length: tope - 10 }, (_, index) => String(index + 10));
  }

  public seleccionarImagenEncabezado(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.nombreEncabezado = input.files[0].name;
    }
  }

  public seleccionarImagenPiePagina(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.nombrePiePagina = input.files[0].name;
    }
  }
}
