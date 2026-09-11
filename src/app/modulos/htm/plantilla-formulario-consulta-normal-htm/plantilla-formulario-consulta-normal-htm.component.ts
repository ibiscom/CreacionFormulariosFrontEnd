import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ComponenteBaseEntity } from '../../../entidades/forms-captura/componente-base.entity';
import { ComponentesEntity } from '../../../entidades/forms-captura/componentes.entity';
import { FormularioJSONEntity } from '../../../entidades/forms-captura/formulario-json.entity';
import { SeccionEntity } from '../../../entidades/forms-captura/seccion.entity';
import { SelectItemEntity } from '../../../entidades/forms-captura/select-item.entity';
import { getFieldPayloadValue, setFieldPayloadValue } from '../../../utilidades/field-value.util';
import { CargaMasivaComponent } from '../../captura/plantilla-form-captura/carga-masiva/carga-masiva.component';
import { InPutTextAreaComponent } from '../../captura/plantilla-form-captura/in-put-text-area/in-put-text-area.component';
import { InPutTextComponent } from '../../captura/plantilla-form-captura/in-put-text/in-put-text.component';
import { LabelComponent } from '../../captura/plantilla-form-captura/label/label.component';
import { LinkToAFormComponent } from '../../captura/plantilla-form-captura/link-to-a-form/link-to-a-form.component';
import { ListaCompuestaComponent } from '../../captura/plantilla-form-captura/lista-compuesta/lista-compuesta.component';
import { OutPutLinkComponent } from '../../captura/plantilla-form-captura/out-put-link/out-put-link.component';
import { SelectBooleanCheckBoxComponent } from '../../captura/plantilla-form-captura/select-boolean-check-box/select-boolean-check-box.component';
import { SelectInPutDateComponent } from '../../captura/plantilla-form-captura/select-in-put-date/select-in-put-date.component';
import { SelectOneListBoxCustomizedComponent } from '../../captura/plantilla-form-captura/select-one-list-box-customized/select-one-list-box-customized.component';
import { SelectOneListBoxComponent } from '../../captura/plantilla-form-captura/select-one-list-box/select-one-list-box.component';
import { SelectOneRadioComponent } from '../../captura/plantilla-form-captura/select-one-radio/select-one-radio.component';

@Component({
  selector: 'app-plantilla-formulario-consulta-normal-htm',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InPutTextComponent,
    InPutTextAreaComponent,
    SelectInPutDateComponent,
    SelectOneListBoxComponent,
    SelectOneListBoxCustomizedComponent,
    SelectBooleanCheckBoxComponent,
    SelectOneRadioComponent,
    CargaMasivaComponent,
    LabelComponent,
    OutPutLinkComponent,
    LinkToAFormComponent,
    ListaCompuestaComponent,
  ],
  templateUrl: './plantilla-formulario-consulta-normal-htm.component.html',
  styleUrl: './plantilla-formulario-consulta-normal-htm.component.scss',
})
export class PlantillaFormularioConsultaNormalHtmComponent {
 //@Input() public id?: string;
  //@Input() public modo: 'ver' | 'editar' | 'nuevo' = 'ver';

  @Input() public formulario: FormularioJSONEntity = {
    titulo: 'Consulta Normal HTM',
    descripcion: 'Migración Angular equivalente de plantillaFormularioConsultaNormalHTM.jspx.',
    seccionesFormulario: {
      Seccion_1: {
        titulo: 'Criterios de consulta',
        descripcion: 'Ingrese los filtros para buscar registros.',
        guardado: 'false',
        expandido: 'true',
        componentesIzq: {
          numero: this.createComponent({
            id: 'numero',
            nombre: 'Número',
            tipoComponente: 'InPutText',
            textType: 'true',
            valor: '1001',
            obligatorio: 'true',
          }),
          descripcion: this.createComponent({
            id: 'descripcion',
            nombre: 'Descripción',
            tipoComponente: 'InPutTextArea',
            textAreaType: 'true',
            valor: '',
          }),
          fecha: this.createComponent({
            id: 'fecha',
            nombre: 'Fecha',
            tipoComponente: 'SelectInPutDate',
            dateType: 'true',
            valor: '2026-07-03',
          }),
        },
        componentesCent: {
          tipo: this.createComponent({
            id: 'tipo',
            nombre: 'Tipo',
            tipoComponente: 'SelectOneListBox',
            listBoxType: 'true',
            valor: 'A',
            items: [
              { label: 'Seleccione', value: '' },
              { label: 'Tipo A', value: 'A' },
              { label: 'Tipo B', value: 'B' },
            ],
          }),
          estado: this.createComponent({
            id: 'estado',
            nombre: 'Activo',
            tipoComponente: 'SelectBooleanCheckBox',
            checkBoxType: 'true',
            valor: 'true',
          }),
          prioridades: this.createComponent({
            id: 'prioridades',
            nombre: 'Prioridad',
            tipoComponente: 'SelectOneRadioButton',
            radioButtonType: 'true',
            valor: 'Alta',
            items: [
              { label: 'Alta', value: 'Alta' },
              { label: 'Media', value: 'Media' },
              { label: 'Baja', value: 'Baja' },
            ],
          }),
        },
        componentesDer: {
          detalleLista: this.createComponent({
            id: 'detalleLista',
            nombre: 'Resumen',
            tipoComponente: 'ListaCompuesta',
            listCompuestaType: 'true',
            textoHTMLTabla: this.createListaCompuestaHtml(),
          }),
          referencia: this.createComponent({
            id: 'referencia',
            nombre: 'Referencia externa',
            tipoComponente: 'OutPutLink',
            linkType: 'true',
            valor: 'https://example.com/reporte',
          }),
        },
      },
    },
    entidades: {},
    entidadPrincipal: '',
    entidadesRelacionadas: {},
    idFormularioPadre: 'vacio',
    nuevo: 'true',
    edicion: 'true',
    eliminable: 'true',
    diligenciable: 'true',
    consultable: 'true',
    plantillasMostrables: 'false',
    htmlAyuda:
      '<p>Ayuda del formulario de consulta normal.</p><p>Este contenido puede provenir del backend.</p>',
  };

  public mensajes: string[] = [];
  public componentValues: Record<string, string | boolean> = {};
  public clicksGuardar = 0;

  public mostrarFormulario = true;
  public mostrarBotonNuevo = true;
  public mostrarBotonEdicion = true;
  public mostrarBotonEliminar = true;
  public hayAnteriorFormulario = true;
  public consultable = true;

  public ventanaAyudaVisible = false;
  public selectedResultIndex: number | null = null;

  public resultadoConsulta: Array<Record<string, string>> = [
    { id: '1', numero: '1001', nombre: 'Registro A', estado: 'Activo' },
    { id: '2', numero: '1002', nombre: 'Registro B', estado: 'Inactivo' },
    { id: '3', numero: '1003', nombre: 'Registro C', estado: 'Activo' },
    { id: '4', numero: '1004', nombre: 'Registro D', estado: 'Activo' },
    { id: '5', numero: '1005', nombre: 'Registro E', estado: 'Inactivo' },
    { id: '6', numero: '1006', nombre: 'Registro F', estado: 'Activo' },
  ];
  public columnasResultado = [
    { key: 'numero', label: 'Número' },
    { key: 'nombre', label: 'Nombre' },
    { key: 'estado', label: 'Estado' },
  ];
  public pageSize = 5;
  public currentPage = 1;

  public ngOnInit(): void {
    this.seedComponentValues();
  }

  public get secciones(): SeccionEntity[] {
    return Object.values(this.formulario.seccionesFormulario);
  }

  public get totalPages(): number {
    return Math.max(1, Math.ceil(this.resultadoConsulta.length / this.pageSize));
  }

  public get pagedResults(): Array<Record<string, string>> {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.resultadoConsulta.slice(start, start + this.pageSize);
  }

  public toggleSeccion(seccion: SeccionEntity): void {
    seccion.expandido = this.asBool(seccion.expandido) ? 'false' : 'true';
  }

  public asBool(value: unknown): boolean {
    return value === true || value === 'true';
  }

  public hasComponentFlag(componente: ComponenteBaseEntity, flagName: string): boolean {
    return this.asBool((componente as unknown as Record<string, unknown>)[flagName]);
  }

  public getComponentList(componentes: ComponentesEntity | ''): ComponenteBaseEntity[] {
    if (componentes === '') {
      return [];
    }
    const values = Object.values(componentes);
    return values.flatMap((entry) => (Array.isArray(entry) ? entry : entry ? [entry] : []));
  }

  public getColumnGridTemplate(seccion: SeccionEntity): string {
    const occupiedColumns = [
      seccion.componentesIzq,
      seccion.componentesCent,
      seccion.componentesDer,
    ].filter((column) => this.getComponentList(column).length > 0).length;

    return `repeat(${Math.max(occupiedColumns, 1)}, minmax(0, 1fr))`;
  }

  public componentKey(componente: ComponenteBaseEntity): string {
    return componente.id ?? componente.nombre;
  }

  public getComponentValue(componente: ComponenteBaseEntity): string | boolean {
    const key = this.componentKey(componente);
    const stored = this.componentValues[key];
    if (stored !== undefined) {
      return stored;
    }

    const payloadValue = getFieldPayloadValue(componente.valor);
    if (this.asBool(componente.checkBoxType)) {
      return payloadValue === true || payloadValue === 'true';
    }

    return payloadValue !== undefined && payloadValue !== null ? String(payloadValue) : '';
  }

  public setComponentValue(componente: ComponenteBaseEntity, value: string | boolean): void {
    this.componentValues[this.componentKey(componente)] = value;

    const newPayload = setFieldPayloadValue(componente.valor, value);
    if (newPayload !== componente.valor) {
      (componente as unknown as { valor: unknown }).valor = newPayload;
    }
  }

  public getSelectItems(componente: ComponenteBaseEntity): Array<{ label: string; value: string }> {
    if (!componente.items) {
      return [];
    }

    return componente.items.map((item: unknown) => {
      const safeItem = item as Partial<SelectItemEntity> & { label?: string; value?: unknown };
      const rawValue = safeItem.value as { value?: unknown } | string | undefined;

      return {
        label: safeItem.label ?? '',
        value: typeof rawValue === 'object' && rawValue ? String(rawValue.value ?? '') : String(rawValue ?? ''),
      };
    });
  }

  public getMostrarAsteriscoRojo(componente: ComponenteBaseEntity): boolean {
    return this.asBool(componente.obligatorio) || this.asBool(componente.obligatorioFuncional);
  }

  public addMensaje(message: string): void {
    this.mensajes = [message, ...this.mensajes].slice(0, 5);
  }

  public abrirVentanaAyuda(): void {
    this.ventanaAyudaVisible = true;
  }

  public cerrarVentanaAyuda(): void {
    this.ventanaAyudaVisible = false;
  }

  public prevencionDobleClic(): boolean {
    this.clicksGuardar += 1;
    return this.clicksGuardar > 1;
  }

  public resetPrevencionDobleClic(): void {
    this.clicksGuardar = 0;
  }

  public guardarFormulario(): void {
    if (this.prevencionDobleClic()) {
      return;
    }

    this.addMensaje('Registro guardado correctamente.');
    this.registrarHistoricoTerminacion();
    this.resetPrevencionDobleClic();
  }

  public editarFormulario(): void {
    if (this.prevencionDobleClic()) {
      return;
    }

    this.addMensaje('Registro editado correctamente.');
    this.resetPrevencionDobleClic();
  }

  public eliminarRegistro(): void {
    this.addMensaje('Registro cancelado/eliminado.');
  }

  public consultar(): void {
    this.currentPage = 1;
    this.addMensaje('Consulta ejecutada con los filtros capturados.');
  }

  public nuevoRegistro(): void {
    this.componentValues = {};
    this.seedComponentValues();
    this.selectedResultIndex = null;
    this.addMensaje('Campos limpiados.');
  }

  public refrescarPagina(): void {
    this.addMensaje('Página refrescada.');
  }

  public regresarAnteriorFormulario(): void {
    this.addMensaje('Regresando al formulario anterior.');
  }

  public actualizarTamanoPaginacion(value: string | number): void {
    const parsed = Number(value);
    this.pageSize = Number.isFinite(parsed) ? Math.min(100, Math.max(1, Math.trunc(parsed))) : 5;
    this.currentPage = 1;
  }

  public goToFirstPage(): void {
    this.currentPage = 1;
  }

  public goToPreviousPage(): void {
    this.currentPage = Math.max(1, this.currentPage - 1);
  }

  public goToNextPage(): void {
    this.currentPage = Math.min(this.totalPages, this.currentPage + 1);
  }

  public goToLastPage(): void {
    this.currentPage = this.totalPages;
  }

  public leerObjectEvento(row: Record<string, string>, localIndex: number): void {
    this.selectedResultIndex = (this.currentPage - 1) * this.pageSize + localIndex;
    this.addMensaje(`Registro seleccionado: ${row['numero']}.`);
  }

  public isSelectedRow(localIndex: number): boolean {
    return this.selectedResultIndex === (this.currentPage - 1) * this.pageSize + localIndex;
  }

  private registrarHistoricoTerminacion(): void {
    this.addMensaje('Histórico de trazabilidad actualizado para terminación de tarea.');
  }

  private seedComponentValues(): void {
    for (const seccion of this.secciones) {
      for (const componente of this.getComponentList(seccion.componentesIzq)) {
        this.seedComponente(componente);
      }
      for (const componente of this.getComponentList(seccion.componentesCent)) {
        this.seedComponente(componente);
      }
      for (const componente of this.getComponentList(seccion.componentesDer)) {
        this.seedComponente(componente);
      }
    }
  }

  private seedComponente(componente: ComponenteBaseEntity): void {
    const key = this.componentKey(componente);
    if (key in this.componentValues) {
      return;
    }

    const defaultValue = getFieldPayloadValue(componente.valor);
    if (this.asBool(componente.checkBoxType)) {
      this.componentValues[key] = defaultValue === true || defaultValue === 'true';
      return;
    }

    this.componentValues[key] = defaultValue !== undefined && defaultValue !== null ? String(defaultValue) : '';
  }

  private createListaCompuestaHtml(): string {
    return [
      '<table>',
      '<tr><th>Columna A</th><th>Columna B</th></tr>',
      '<tr><td>Valor 1</td><td>Valor 2</td></tr>',
      '<tr><td>Valor 3</td><td>Valor 4</td></tr>',
      '</table>',
    ].join('');
  }

  private createComponent(partial: {
    id: string;
    nombre: string;
    tipoComponente: string;
    valor?: string;
    textoHTMLTabla?: string;
    items?: Array<{ label: string; value: string }>;
    obligatorio?: 'true' | 'false';
    textType?: 'true';
    textAreaType?: 'true';
    dateType?: 'true';
    checkBoxType?: 'true';
    listBoxType?: 'true';
    radioButtonType?: 'true';
    listCompuestaType?: 'true';
    linkType?: 'true';
  }): ComponenteBaseEntity {
    return {
      cambiado: 'false',
      observadores: '',
      id: partial.id,
      nombre: partial.nombre,
      tipoDato: 'string',
      tipoComponente: partial.tipoComponente,
      descripcion: partial.nombre,
      valor: { class: 'java.lang.String', value: partial.valor ?? '' },
      ultimoId: '0',
      obligatorio: partial.obligatorio ?? 'false',
      obligatorioFuncional: 'false',
      readOnly: 'false',
      guardado: 'false',
      cumpleValidaciones: 'true',
      opcionExtra: 'false',
      integerType: 'false',
      textType: partial.textType ?? 'false',
      dateType: partial.dateType ?? 'false',
      separadorType: 'false',
      checkBoxType: partial.checkBoxType ?? 'false',
      textAreaType: partial.textAreaType ?? 'false',
      listBoxType: partial.listBoxType ?? 'false',
      listBoxCustomizedType: 'false',
      radioButtonType: partial.radioButtonType ?? 'false',
      listCompuestaType: partial.listCompuestaType ?? 'false',
      grillaType: 'false',
      labelType: 'false',
      cargaMasivaType: 'false',
      mailType: 'false',
      searchButtonType: 'false',
      refreshButtonType: 'false',
      saveButtonType: 'false',
      linkType: partial.linkType ?? 'false',
      linkToAFormType: 'false',
      linkFormToIfacesType: 'false',
      validacionesExpresiones: '',
      style: '',
      styleClass: '',
      styleContenedor: '',
      styleClassContenedor: '',
      columnClasses: 'columnaAlineacionVertical1,columnaAlineacionVertical2',
      claseEstilo: '',
      visible: 'true',
      filtro: 'false',
      relacionObservadorColumna: '',
      tablaDetalleType: 'false',
      richTextType: 'false',
      estaSujeto: 'false',
      esOrigenValidacion: 'false',
      componentesRelacionados: '',
      componentesNuevaValidacionEntreComponentes: '',
      arbolesExpresionNuevaValidacionEntreComponentes: '',
      operadorAritmetico: '',
      items: partial.items,
      textoHTMLTabla: partial.textoHTMLTabla ?? (partial.listCompuestaType ? this.createListaCompuestaHtml() : undefined),
    };
  }

}
