import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormularioConsultaJSONEntity } from '../../../../entidades/forms-consulta/formulario-consulta-json.entity';
import { SeccionConsultaEntity } from '../../../../entidades/forms-consulta/seccion-consulta.entity';
import { ComponenteBaseEntity } from '../../../../entidades/forms-captura/componente-base.entity';
import { EntidadCatalogoEntity } from '../../../../entidades/forms-captura/entidad-catalogo.entity';
import { ColumnaEntidadEntity } from '../../../../entidades/forms-captura/columna-entidad.entity';
import { ValidacionExpresionRegularEntity } from '../../../../entidades/forms-captura/validacion-expresion-regular.entity';
import { ObservadorComponenteEntity } from '../../../../entidades/forms-captura/observador-componente.entity';
import { LinkToDifferentFormEntity } from '../../../../entidades/forms-captura/link-to-different-form';
import { ComponentesComponent } from '../../../captura/plantilla-form-captura/componentes/componentes.component';
import { EntidadCatalogoService } from '../../../captura/modelar-form-captura/entidad-catalogo.service';
import { ModeladorCatalogoService } from '../../../captura/modelar-form-captura/modelador-catalogo.service';
import { ModelarFormConsultaService } from '../modelar-form-consulta.service';
import { SeleccionTablaService } from '../../../seleccion-tabla/seleccion-tabla.service';
import { MessageUtil } from '../../../../utilidades/message.util';

@Component({
  selector: 'app-modelar-form-consulta',
  imports: [CommonModule, FormsModule, ComponentesComponent],
  templateUrl: './modelar-form-consulta.component.html',
  styleUrl: './modelar-form-consulta.component.scss',
})
export class ModelarFormConsultaComponent implements OnInit {
  private readonly defaultContainerWidth = '50';
  private readonly defaultFieldWidth = '90';
  private readonly defaultLabelWidth = '30';
  private readonly defaultFieldColumnWidth = '70';

  public mensaje = '';
  public mensajes: string[] = [];

  public formulario: FormularioConsultaJSONEntity = this.createDefaultForm();

  public nombresEntidadesPrincipales: string[] = [];
  public nombreEntidadPrincipalStaged = '';
  public entidadPrincipalCatalogo: EntidadCatalogoEntity | null = null;
  public entidadesRelacionadasCatalogo: EntidadCatalogoEntity[] = [];
  public atributoSeleccionado: { entidad: string; columna: string } | null = null;

  public estilosComponente: string[] = [];
  public formulariosDisponibles: string[] = [];
  public formulariosConsultaDisponibles: string[] = [];
  public atributosTipoLista: string[] = [];
  public atributosRuta: string[] = [];
  public nombresEntidadesRelacionadas: string[] = [];

  public selectedSectionKey = '';
  public selectedComponentKey = '';
  public selectedComponentType = 'InPutText';
  public draggedComponentType = '';
  public activeDropSectionKey = '';

  /** El modelador de consulta ofrece un subconjunto de los tipos del de captura. */
  public readonly componentTypes = [
    'InPutText',
    'InPutTextArea',
    'SelectInPutDate',
    'SelectBooleanCheckBox',
    'SelectOneListBox',
    'SelectOneListBoxCustomized',
    'SelectOneRadioButton',
    'LinkToAForm',
    'LinkToDifferentForm',
    'OutPutLink',
    'Separador',
    'SearchButton',
    'RefreshButton',
  ];

  public readonly widthOptions = Array.from({ length: 20 }, (_, index) => String((index + 1) * 5));
  public readonly heightOptions = ['Normal', ...Array.from({ length: 35 }, (_, index) => String((index + 1) * 20))];

  /** Columnas del resultado de la consulta. */
  public nombreColumnaConsulta = '';
  public atributoSeleccionadoColumna = '';
  public nombreColumnaRelacionSeleccionada = '';
  public atributoForaneoSeleccionado = '';
  public mensajeColumna = '';

  public validacionExp: ValidacionExpresionRegularEntity = this.createValidacionDraft();
  public mensajeValidaciones = '';

  public idObservadorSeleccionado = '';
  public nombreColumnaDeRelacionSeleccionada = '';
  public mensajesObservadores: string[] = [];

  public mostrarVentanaAyuda = false;
  public mostrarVentanaConfLinkToDifferentForm = false;
  public tipoFormularioEscogido = 'captura';
  public nombreFormularioLink = '';
  public nombreFormularioConsultaLink = '';
  public metodosValidacionSeleccion: string[] = [];

  public mostrarVentanaSeleccionEntidad = false;
  public entidadForaneaSeleccionada: EntidadCatalogoEntity | null = null;
  public columnaForaneaOrigen = '';
  public columnasMostrablesSeleccionadas: Record<string, boolean> = {};
  public condicionesEntidad: Array<{ identificador: string; atributo: string; operador: string; valor: string }> = [];
  public whereEntidad = '';
  public mensajeCondiciones = '';
  public readonly operadoresCondiciones = ['=', '!=', '<', '>', '<=', '>=', '= NULL', '!= NULL'];

  public constructor(
    private cdr: ChangeDetectorRef,
    private entidadCatalogoService: EntidadCatalogoService,
    private modeladorCatalogoService: ModeladorCatalogoService,
    private modelarFormConsultaService: ModelarFormConsultaService,
    private seleccionTablaService: SeleccionTablaService,
  ) {}

  public ngOnInit(): void {
    this.entidadCatalogoService.getNombresEntidadesPrincipales().subscribe((nombres) => {
      this.nombresEntidadesPrincipales = nombres;
      this.cdr.detectChanges();
    });
    this.modeladorCatalogoService.getEstilosComponente().subscribe((estilos) => {
      this.estilosComponente = estilos;
      this.cdr.detectChanges();
    });
    this.modeladorCatalogoService.getFormularios().subscribe((formularios) => {
      this.formulariosDisponibles = formularios;
      this.cdr.detectChanges();
    });
    this.modeladorCatalogoService.getFormulariosConsulta().subscribe((formularios) => {
      this.formulariosConsultaDisponibles = formularios;
      this.cdr.detectChanges();
    });

    // La pantalla de selección de tabla deja aquí la entidad escogida (sessionMap del legado).
    const seleccion = this.seleccionTablaService.consumirSeleccion();
    if (seleccion) {
      this.nombreEntidadPrincipalStaged = seleccion.entidadPrincipal.nombre;
      this.cambiarEntidadPrincipal();
    }
  }

  // ---------------------------------------------------------------- Entidad principal y atributos

  public cambiarEntidadPrincipal(): void {
    if (!this.nombreEntidadPrincipalStaged) {
      return;
    }

    this.formulario = { ...this.formulario, entidadPrincipal: this.nombreEntidadPrincipalStaged };
    this.atributoSeleccionado = null;

    this.entidadCatalogoService.getEntidadPorNombre(this.nombreEntidadPrincipalStaged).subscribe((entidad) => {
      this.entidadPrincipalCatalogo = entidad ?? null;
      this.cdr.detectChanges();
    });

    this.entidadCatalogoService
      .getEntidadesRelacionadasUnoAUno(this.nombreEntidadPrincipalStaged)
      .subscribe((relacionadas) => {
        this.entidadesRelacionadasCatalogo = relacionadas;
        this.actualizarEntidadesDelFormulario();
        this.cdr.detectChanges();
      });

    this.entidadCatalogoService.getAtributosTipoLista(this.nombreEntidadPrincipalStaged).subscribe((atributos) => {
      this.atributosTipoLista = atributos;
      this.cdr.detectChanges();
    });

    this.entidadCatalogoService.getAtributosRuta(this.nombreEntidadPrincipalStaged).subscribe((atributos) => {
      this.atributosRuta = atributos;
      this.cdr.detectChanges();
    });

    this.entidadCatalogoService
      .getNombresEntidadesRelacionadas(this.nombreEntidadPrincipalStaged)
      .subscribe((nombres) => {
        this.nombresEntidadesRelacionadas = nombres;
        this.cdr.detectChanges();
      });
  }

  private actualizarEntidadesDelFormulario(): void {
    const entidades: Record<string, string> = {};
    if (this.entidadPrincipalCatalogo) {
      entidades['string_1'] = this.entidadPrincipalCatalogo.nombre;
    }
    this.entidadesRelacionadasCatalogo.forEach((entidad, index) => {
      entidades[`string_${index + 2}`] = entidad.nombre;
    });

    const entidadesRelacionadas: Record<string, string> = {};
    this.entidadesRelacionadasCatalogo.forEach((entidad, index) => {
      entidadesRelacionadas[`string_${index + 1}`] = entidad.nombre;
    });

    this.formulario = { ...this.formulario, entidades, entidadesRelacionadas };
  }

  public isColumnaVisibleEnAtributos(columna: ColumnaEntidadEntity): boolean {
    if (!columna.esLlaveForanea) {
      return true;
    }
    return columna.tipoRelacion === 'UnoAUno';
  }

  public getTipoDatoTitulo(columna: ColumnaEntidadEntity): string {
    if (columna.esLlaveForanea) {
      return `Llave foránea a ${columna.entidadRelacionada}`;
    }
    switch (columna.javaType) {
      case 'java.util.Date':
        return 'Tipo de dato: Date-Fecha';
      case 'java.lang.Boolean':
        return 'Tipo de dato: Boolean-Verdadero/Falso';
      case 'java.lang.Integer':
        return 'Tipo de dato: Integer-Número entero';
      case 'java.lang.Double':
        return 'Tipo de dato: Double-Número decimal';
      default:
        return 'Tipo de dato: String-Texto';
    }
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

  public seleccionarColumnaEntidad(nombreEntidad: string, columna: ColumnaEntidadEntity): void {
    this.atributoSeleccionado = { entidad: nombreEntidad, columna: columna.nombre };
  }

  public isAtributoSeleccionado(nombreEntidad: string, nombreColumna: string): boolean {
    return this.atributoSeleccionado?.entidad === nombreEntidad && this.atributoSeleccionado?.columna === nombreColumna;
  }

  // ---------------------------------------------------------------- Columnas del resultado

  public getColumnasEntidadPrincipal(): string[] {
    return (this.entidadPrincipalCatalogo?.columnas ?? []).map((columna) => columna.nombre);
  }

  public getColumnasForaneasPrincipal(): string[] {
    return (this.entidadPrincipalCatalogo?.columnas ?? [])
      .filter((columna) => columna.esLlaveForanea && columna.entidadRelacionada)
      .map((columna) => columna.nombre);
  }

  /** Columnas de la entidad a la que apunta el atributo foráneo seleccionado. */
  public getColumnasAtributoForaneo(): string[] {
    const columna = (this.entidadPrincipalCatalogo?.columnas ?? []).find(
      (item) => item.nombre === this.nombreColumnaRelacionSeleccionada,
    );
    const relacionada = this.entidadesRelacionadasCatalogo.find(
      (item) => item.nombre === columna?.entidadRelacionada,
    );
    return (relacionada?.columnas ?? []).map((item) => item.nombre);
  }

  public getColumnasOrganizadas(): string[] {
    return this.formulario.nombresColumnasOrganizadas ?? [];
  }

  private setColumnasOrganizadas(columnas: string[]): void {
    const posiciones: { [columna: string]: string } = {};
    columnas.forEach((columna, indice) => (posiciones[columna] = String(indice)));
    this.formulario = {
      ...this.formulario,
      nombresColumnasOrganizadas: columnas,
      nombresColumnasTabla: columnas,
      posicionesNombres: posiciones,
    };
  }

  public agregarColumnaResultado(): void {
    this.mensajeColumna = '';
    const nombre = this.atributoSeleccionadoColumna;
    if (!nombre) {
      this.mensajeColumna = 'Seleccione un atributo para agregarlo como columna.';
      return;
    }
    this.agregarColumnaOrganizada(nombre);
  }

  public agregarColumnaForanea(): void {
    this.mensajeColumna = '';
    if (!this.nombreColumnaRelacionSeleccionada || !this.atributoForaneoSeleccionado) {
      this.mensajeColumna = 'Seleccione el atributo foráneo y la columna a mostrar.';
      return;
    }

    const nombre = `${this.nombreColumnaRelacionSeleccionada}.${this.atributoForaneoSeleccionado}`;
    this.agregarColumnaOrganizada(nombre);

    const relacionadas = { ...(this.formulario.nombresColumnasRelacionadasMostrar ?? {}) };
    const actuales = relacionadas[this.nombreColumnaRelacionSeleccionada] ?? [];
    if (!actuales.includes(this.atributoForaneoSeleccionado)) {
      relacionadas[this.nombreColumnaRelacionSeleccionada] = [...actuales, this.atributoForaneoSeleccionado];
      this.formulario = { ...this.formulario, nombresColumnasRelacionadasMostrar: relacionadas };
    }
  }

  private agregarColumnaOrganizada(nombre: string): void {
    const columnas = this.getColumnasOrganizadas();
    if (columnas.includes(nombre)) {
      this.mensajeColumna = 'Ya existe una columna con el mismo nombre, por favor escriba uno diferente';
      return;
    }

    this.setColumnasOrganizadas([...columnas, nombre]);
    // El título por defecto es el nombre digitado, o el del atributo si no se digitó.
    this.setTituloColumna(nombre, this.nombreColumnaConsulta || nombre);
    this.nombreColumnaConsulta = '';
  }

  public eliminarColumnaResultado(nombre: string): void {
    this.setColumnasOrganizadas(this.getColumnasOrganizadas().filter((item) => item !== nombre));

    const titulos = { ...(this.formulario.nombresColumnas ?? {}) };
    delete titulos[nombre];
    this.formulario = { ...this.formulario, nombresColumnas: titulos };
  }

  public moverColumnaResultado(nombre: string, direccion: -1 | 1): void {
    const columnas = [...this.getColumnasOrganizadas()];
    const indice = columnas.indexOf(nombre);
    const destino = indice + direccion;
    if (indice < 0 || destino < 0 || destino >= columnas.length) {
      return;
    }
    [columnas[indice], columnas[destino]] = [columnas[destino], columnas[indice]];
    this.setColumnasOrganizadas(columnas);
  }

  public getTituloColumna(nombre: string): string {
    return (this.formulario.nombresColumnas ?? {})[nombre] ?? '';
  }

  public setTituloColumna(nombre: string, titulo: string): void {
    this.formulario = {
      ...this.formulario,
      nombresColumnas: { ...(this.formulario.nombresColumnas ?? {}), [nombre]: titulo },
    };
  }

  public getFormatoColumna(nombre: string): string {
    return (this.formulario.formatosColumnas ?? {})[nombre] ?? '';
  }

  public setFormatoColumna(nombre: string, formato: string): void {
    this.formulario = {
      ...this.formulario,
      formatosColumnas: { ...(this.formulario.formatosColumnas ?? {}), [nombre]: formato },
    };
  }

  // ---------------------------------------------------------------- Secciones

  public getSectionEntries(): Array<{ key: string; value: SeccionConsultaEntity }> {
    return Object.entries(this.formulario.seccionesFormularioConsulta ?? {}).map(([key, value]) => ({
      key,
      value: value as SeccionConsultaEntity,
    }));
  }

  public addSection(): void {
    const total = Object.keys(this.formulario.seccionesFormularioConsulta ?? {}).length;
    const sectionKey = `Seccion_${total + 1}`;
    const section: SeccionConsultaEntity = {
      titulo: `Nueva sección ${total + 1}`,
      descripcion: '',
      componentesIzq: {},
      componentesCent: {},
      componentesDer: {},
      guardado: 'false',
      expandido: 'true',
      mostrarListaCondiciones: 'false',
    };

    this.formulario = {
      ...this.formulario,
      seccionesFormularioConsulta: {
        ...(this.formulario.seccionesFormularioConsulta ?? {}),
        [sectionKey]: section,
      },
    };
    this.selectedSectionKey = sectionKey;
    this.selectedComponentKey = '';
    this.cdr.detectChanges();
  }

  public removeSelectedSection(): void {
    if (!this.selectedSectionKey) {
      return;
    }

    const sections = { ...(this.formulario.seccionesFormularioConsulta ?? {}) };
    delete sections[this.selectedSectionKey];
    this.formulario = { ...this.formulario, seccionesFormularioConsulta: sections };
    this.selectedSectionKey = Object.keys(sections)[0] ?? '';
    this.selectedComponentKey = '';
    this.cdr.detectChanges();
  }

  public updateSelectedSectionProperty(property: keyof SeccionConsultaEntity, value: string): void {
    const section = this.formulario.seccionesFormularioConsulta?.[this.selectedSectionKey];
    if (!section) {
      return;
    }

    const updatedSection = { ...section, [property]: value } as SeccionConsultaEntity;
    this.formulario = {
      ...this.formulario,
      seccionesFormularioConsulta: {
        ...(this.formulario.seccionesFormularioConsulta ?? {}),
        [this.selectedSectionKey]: updatedSection,
      },
    };
  }

  public selectSection(key: string): void {
    this.selectedSectionKey = key;
    this.selectedComponentKey = '';
  }

  // ---------------------------------------------------------------- Componentes

  public addComponentToSelectedSection(): void {
    if (!this.selectedSectionKey) {
      return;
    }
    this.addComponentToSection(this.selectedSectionKey, this.selectedComponentType);
  }

  public addComponentToSection(sectionKey: string, componentType: string): string | null {
    const section = this.formulario.seccionesFormularioConsulta?.[sectionKey];
    if (!sectionKey || !section) {
      return null;
    }

    const components = section.componentesIzq;
    const existentes = components && typeof components !== 'string' ? components : {};
    const componentKey = `Componente_${Object.keys(existentes).length + 1}`;
    const component = this.buildComponentEntity(componentType, componentKey);

    if (this.atributoSeleccionado) {
      component.nombreEntidad = this.atributoSeleccionado.entidad;
      component.idColumna = `${this.atributoSeleccionado.entidad}|${this.atributoSeleccionado.columna}`;
      this.atributoSeleccionado = null;
    }

    const updatedSection: SeccionConsultaEntity = {
      ...section,
      componentesIzq: { ...existentes, [componentKey]: component },
    };

    this.formulario = {
      ...this.formulario,
      seccionesFormularioConsulta: {
        ...(this.formulario.seccionesFormularioConsulta ?? {}),
        [sectionKey]: updatedSection,
      },
    };

    this.selectedSectionKey = sectionKey;
    this.selectedComponentKey = componentKey;
    this.selectedComponentType = componentType;
    this.cdr.detectChanges();
    return componentKey;
  }

  public selectComponent(key: string, sectionKey?: string): void {
    const targetSectionKey = sectionKey || this.selectedSectionKey;
    const section = this.formulario.seccionesFormularioConsulta?.[targetSectionKey];
    const components = section?.componentesIzq;

    if (!components || typeof components === 'string' || !(key in components)) {
      this.selectedComponentKey = '';
      return;
    }

    this.selectedSectionKey = targetSectionKey;
    this.selectedComponentKey = key;
    this.cdr.detectChanges();
  }

  public getComponentEntries(sectionKey: string): Array<{ key: string; value: ComponenteBaseEntity }> {
    const components = this.formulario.seccionesFormularioConsulta?.[sectionKey]?.componentesIzq;
    if (!components || typeof components === 'string') {
      return [];
    }

    return Object.entries(components as Record<string, ComponenteBaseEntity | undefined>)
      .filter((entry): entry is [string, ComponenteBaseEntity] => !!entry[1])
      .map(([key, value]) => ({ key, value }));
  }

  public getAllComponentEntries(): Array<{ key: string; value: ComponenteBaseEntity }> {
    const entries: Array<{ key: string; value: ComponenteBaseEntity }> = [];
    for (const section of this.getSectionEntries()) {
      entries.push(...this.getComponentEntries(section.key));
    }
    return entries;
  }

  public getSelectedComponent(): ComponenteBaseEntity | null {
    if (!this.selectedSectionKey || !this.selectedComponentKey) {
      return null;
    }

    const components = this.formulario.seccionesFormularioConsulta?.[this.selectedSectionKey]?.componentesIzq;
    if (!components || typeof components === 'string') {
      return null;
    }

    return (components as Record<string, ComponenteBaseEntity | undefined>)[this.selectedComponentKey] ?? null;
  }

  public removeSelectedComponent(): void {
    const section = this.formulario.seccionesFormularioConsulta?.[this.selectedSectionKey];
    const components = section?.componentesIzq;
    if (!section || !components || typeof components === 'string') {
      return;
    }

    const restantes = { ...(components as Record<string, ComponenteBaseEntity>) };
    delete restantes[this.selectedComponentKey];

    this.formulario = {
      ...this.formulario,
      seccionesFormularioConsulta: {
        ...(this.formulario.seccionesFormularioConsulta ?? {}),
        [this.selectedSectionKey]: { ...section, componentesIzq: restantes },
      },
    };
    this.selectedComponentKey = '';
    this.cdr.detectChanges();
  }

  public moveComponentInSection(sectionKey: string, sourceKey: string, targetKey: string): void {
    const section = this.formulario.seccionesFormularioConsulta?.[sectionKey];
    const components = section?.componentesIzq;
    if (!section || !components || typeof components === 'string' || !sourceKey) {
      return;
    }

    const entries = Object.entries(components as Record<string, ComponenteBaseEntity>);
    const sourceEntry = entries.find(([key]) => key === sourceKey);
    if (!sourceEntry) {
      return;
    }

    const withoutSource = entries.filter(([key]) => key !== sourceKey);
    const targetIndex = targetKey ? withoutSource.findIndex(([key]) => key === targetKey) : -1;
    const insertIndex = targetIndex >= 0 ? targetIndex + 1 : withoutSource.length;
    withoutSource.splice(insertIndex, 0, sourceEntry);

    this.formulario = {
      ...this.formulario,
      seccionesFormularioConsulta: {
        ...(this.formulario.seccionesFormularioConsulta ?? {}),
        [sectionKey]: { ...section, componentesIzq: Object.fromEntries(withoutSource) },
      },
    };
    this.cdr.detectChanges();
  }

  public reorderComponent(event: { sourceKey: string; targetKey: string; sectionKey: string }): void {
    this.moveComponentInSection(event.sectionKey, event.sourceKey, event.targetKey);
    this.selectComponent(event.targetKey, event.sectionKey);
  }

  // ---------------------------------------------------------------- Drag and drop

  public dragComponent(type: string, event: DragEvent): void {
    this.draggedComponentType = type;
    event.dataTransfer?.setData('text/plain', type);
  }

  public allowDrop(event: DragEvent): void {
    event.preventDefault();
  }

  public onSectionDragOver(sectionKey: string, event: DragEvent): void {
    this.allowDrop(event);
    this.activeDropSectionKey = sectionKey;
  }

  public onSectionDragLeave(sectionKey: string): void {
    if (this.activeDropSectionKey === sectionKey) {
      this.activeDropSectionKey = '';
    }
  }

  public isDraggingOverSection(sectionKey: string): boolean {
    return this.activeDropSectionKey === sectionKey;
  }

  public dropComponent(sectionKey: string, event: DragEvent): void {
    this.allowDrop(event);
    this.activeDropSectionKey = '';
    const data = event.dataTransfer?.getData('text/plain') ?? '';

    if (data.startsWith('component:')) {
      this.moveComponentInSection(sectionKey, data.replace('component:', ''), '');
      this.draggedComponentType = '';
      return;
    }

    const componentType = data || this.draggedComponentType;
    if (componentType) {
      this.addComponentToSection(sectionKey, componentType);
    }
    this.draggedComponentType = '';
  }

  // ---------------------------------------------------------------- Propiedades del componente

  public isComponenteLigadoAColumna(component: ComponenteBaseEntity | null): boolean {
    if (!component) {
      return false;
    }
    const tiposConIdentificadorLibre = [
      'Separador', 'OutPutLink', 'LinkToAForm', 'LinkToDifferentForm',
      'SearchButton', 'RefreshButton', 'SelectOneListBoxCustomized',
    ];
    return !tiposConIdentificadorLibre.includes(component.tipoComponente);
  }

  public isInputLikeComponent(component: ComponenteBaseEntity | null): boolean {
    return (
      !!component &&
      ['InPutText', 'InPutTextArea', 'SelectOneListBox', 'SelectOneListBoxCustomized', 'SelectOneRadioButton', 'SelectBooleanCheckBox', 'SelectInPutDate'].includes(
        component.tipoComponente,
      )
    );
  }

  public isListLikeComponent(component: ComponenteBaseEntity | null): boolean {
    return !!component && ['SelectOneListBox', 'SelectOneListBoxCustomized', 'SelectOneRadioButton'].includes(component.tipoComponente);
  }

  public isLinkLikeComponent(component: ComponenteBaseEntity | null): boolean {
    return !!component && ['OutPutLink', 'LinkToAForm', 'LinkToDifferentForm'].includes(component.tipoComponente);
  }

  public isLinkToAFormComponent(component: ComponenteBaseEntity | null): boolean {
    return !!component && component.tipoComponente === 'LinkToAForm';
  }

  public isLinkToDifferentFormComponent(component: ComponenteBaseEntity | null): boolean {
    return !!component && component.tipoComponente === 'LinkToDifferentForm';
  }

  public isListBoxCustomizedComponent(component: ComponenteBaseEntity | null): boolean {
    return !!component && component.tipoComponente === 'SelectOneListBoxCustomized';
  }

  public isRadioButtonComponent(component: ComponenteBaseEntity | null): boolean {
    return !!component && component.tipoComponente === 'SelectOneRadioButton';
  }

  public isDateOrTextComponent(component: ComponenteBaseEntity | null): boolean {
    return !!component && ['SelectInPutDate', 'InPutText', 'InPutTextArea'].includes(component.tipoComponente);
  }

  public isButtonLikeComponent(component: ComponenteBaseEntity | null): boolean {
    return !!component && ['SearchButton', 'RefreshButton'].includes(component.tipoComponente);
  }

  public updateSelectedComponentProperty(property: string, value: string): void {
    const selected = this.getSelectedComponent();
    if (!selected) {
      return;
    }

    const booleanProperties = new Set([
      'obligatorio', 'obligatorioFuncional', 'readOnly', 'visible', 'filtro',
      'utilizaImagen', 'mostrarLink', 'dirigeFormularioConsulta', 'labelOrganizable',
    ]);
    (selected as unknown as Record<string, unknown>)[property] = booleanProperties.has(property)
      ? value === 'true'
        ? 'true'
        : 'false'
      : value;
  }

  public updateSelectedComponentArrayProperty(property: string, values: string[]): void {
    const selected = this.getSelectedComponent();
    if (!selected) {
      return;
    }
    (selected as unknown as Record<string, unknown>)[property] = values ?? [];
  }

  public updateSelectedComponentValue(value: string): void {
    const selected = this.getSelectedComponent();
    if (!selected) {
      return;
    }
    selected.valor = { ...(selected.valor ?? { class: 'java.lang.String' }), value, class: 'java.lang.String' };
  }

  public updateFormProperty(property: keyof FormularioConsultaJSONEntity, value: string): void {
    const booleanProperties = new Set([
      'nuevo', 'edicion', 'eliminable', 'diligenciable', 'consultable', 'plantillasMostrables', 'permitirGraficas',
    ]);
    this.formulario = {
      ...this.formulario,
      [property]: booleanProperties.has(property) ? (value === 'true' ? 'true' : 'false') : value,
    } as FormularioConsultaJSONEntity;
  }

  // ---------------------------------------------------------------- Layout del componente

  public getSelectedComponentWidth(property: 'container' | 'field'): string {
    const selected = this.getSelectedComponent();
    const source = property === 'container' ? selected?.styleContenedor : selected?.style;
    const match = source?.match(/width\s*:\s*([\d.]+)%/i);
    if (match?.[1]) {
      return match[1];
    }
    return property === 'container' ? this.defaultContainerWidth : this.defaultFieldWidth;
  }

  public getSelectedComponentHeight(property: 'container' | 'field'): string {
    const selected = this.getSelectedComponent();
    const source = property === 'container' ? selected?.styleContenedor : selected?.style;
    return source?.match(/height\s*:\s*([\d.]+)px/i)?.[1] ?? 'Normal';
  }

  public getSelectedComponentColumnWidth(part: 'label' | 'field'): string {
    const selected = this.getSelectedComponent();
    const columns = selected?.columnClasses?.split(',').map((item) => item.trim()) ?? [];
    const value = columns[part === 'label' ? 0 : 1];
    const width = value?.replace(/^width/i, '').replace('%', '');
    if (width) {
      return width;
    }
    return part === 'label' ? this.defaultLabelWidth : this.defaultFieldColumnWidth;
  }

  public updateSelectedComponentLayout(
    property: 'containerWidth' | 'containerHeight' | 'fieldWidth' | 'fieldHeight' | 'labelWidth' | 'fieldColumnWidth',
    value: string,
  ): void {
    const selected = this.getSelectedComponent();
    if (!selected) {
      return;
    }

    if (property === 'containerWidth' || property === 'containerHeight') {
      const width = property === 'containerWidth' ? value : this.getSelectedComponentWidth('container');
      const height = property === 'containerHeight' ? value : this.getSelectedComponentHeight('container');
      selected.styleContenedor = `width:${width}%;${height !== 'Normal' ? `height:${height}px;` : ''}`;
      return;
    }

    if (property === 'fieldWidth' || property === 'fieldHeight') {
      const width = property === 'fieldWidth' ? value : this.getSelectedComponentWidth('field');
      const height = property === 'fieldHeight' ? value : this.getSelectedComponentHeight('field');
      selected.style = `width:${width}%;${height !== 'Normal' ? `height:${height}px;` : ''}`;
      return;
    }

    const labelWidth = property === 'labelWidth' ? value : this.getSelectedComponentColumnWidth('label');
    const fieldWidth = property === 'fieldColumnWidth' ? value : this.getSelectedComponentColumnWidth('field');
    selected.columnClasses = `width${labelWidth},width${fieldWidth}`;
  }

  // ---------------------------------------------------------------- Observadores

  public getItemsListasDesplegables(): Array<{ key: string; value: ComponenteBaseEntity }> {
    return this.getAllComponentEntries().filter(
      ({ key, value }) =>
        key !== this.selectedComponentKey && ['SelectOneListBox', 'SelectOneRadioButton'].includes(value.tipoComponente),
    );
  }

  public getItemsColumnasDeRelacion(): string[] {
    return this.getColumnasForaneasPrincipal();
  }

  public getObservadoresComponente(): ObservadorComponenteEntity[] {
    const selected = this.getSelectedComponent();
    if (!selected?.observadores) {
      return [];
    }

    let relaciones: Record<string, string> = {};
    try {
      relaciones = selected.relacionObservadorColumna ? JSON.parse(selected.relacionObservadorColumna) : {};
    } catch {
      relaciones = {};
    }

    return selected.observadores
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean)
      .map((claveComponente) => {
        const observador = this.getAllComponentEntries().find((entry) => entry.key === claveComponente)?.value;
        return {
          claveComponente,
          nombre: observador?.nombre ?? claveComponente,
          idColumna: observador?.idColumna ?? '',
          atributoUnion: relaciones[claveComponente] ?? '',
        };
      });
  }

  public asignarObservador(): void {
    this.mensajesObservadores = [];
    const selected = this.getSelectedComponent();
    if (!selected) {
      return;
    }
    if (!this.idObservadorSeleccionado) {
      this.mensajesObservadores = ['Seleccione un componente observador'];
      return;
    }
    if (!this.nombreColumnaDeRelacionSeleccionada) {
      this.mensajesObservadores = ['Seleccione una columna que relacione los componentes.'];
      return;
    }

    const observadores = this.getObservadoresComponente();
    if (observadores.some((item) => item.claveComponente === this.idObservadorSeleccionado)) {
      this.mensajesObservadores = ['Este componente ya contiene ese observador.'];
      return;
    }

    const relaciones: Record<string, string> = {};
    observadores.forEach((item) => (relaciones[item.claveComponente] = item.atributoUnion));
    relaciones[this.idObservadorSeleccionado] = this.nombreColumnaDeRelacionSeleccionada;

    selected.observadores = [...observadores.map((item) => item.claveComponente), this.idObservadorSeleccionado].join(',');
    selected.relacionObservadorColumna = JSON.stringify(relaciones);
    this.idObservadorSeleccionado = '';
    this.nombreColumnaDeRelacionSeleccionada = '';
  }

  public eliminarObservador(claveComponente: string): void {
    const selected = this.getSelectedComponent();
    if (!selected) {
      return;
    }

    const observadores = this.getObservadoresComponente().filter((item) => item.claveComponente !== claveComponente);
    const relaciones: Record<string, string> = {};
    observadores.forEach((item) => (relaciones[item.claveComponente] = item.atributoUnion));

    selected.observadores = observadores.map((item) => item.claveComponente).join(',');
    selected.relacionObservadorColumna = observadores.length ? JSON.stringify(relaciones) : '';
  }

  // ---------------------------------------------------------------- Validaciones de expresión regular

  private createValidacionDraft(): ValidacionExpresionRegularEntity {
    return { nombre: '', ejemplo: '', entrada: '', expresion: '', mensajeValidacion: '', cumple: false };
  }

  public getValidacionesComponente(): ValidacionExpresionRegularEntity[] {
    const selected = this.getSelectedComponent();
    if (!selected?.validacionesExpresiones) {
      return [];
    }
    try {
      const parsed = JSON.parse(selected.validacionesExpresiones);
      return Array.isArray(parsed) ? (parsed as ValidacionExpresionRegularEntity[]) : [];
    } catch {
      return [];
    }
  }

  private setValidacionesComponente(validaciones: ValidacionExpresionRegularEntity[]): void {
    const selected = this.getSelectedComponent();
    if (!selected) {
      return;
    }
    selected.validacionesExpresiones = validaciones.length ? JSON.stringify(validaciones) : '';
  }

  public probarValidacion(): void {
    if (!this.validacionExp.entrada || !this.validacionExp.expresion) {
      this.mensajeValidaciones = 'Ingrese el valor de prueba y/o la expresión a validar';
      return;
    }
    try {
      const patron = new RegExp(`^(?:${this.validacionExp.expresion})$`);
      this.validacionExp.cumple = patron.test(this.validacionExp.entrada);
      this.mensajeValidaciones = this.validacionExp.cumple
        ? 'Concuerda'
        : this.validacionExp.mensajeValidacion || 'No concuerda';
    } catch {
      this.validacionExp.cumple = false;
      this.mensajeValidaciones = 'No se puede compilar la expresión regular';
    }
  }

  public agregarValidacion(): void {
    if (
      !this.validacionExp.nombre ||
      !this.validacionExp.ejemplo ||
      !this.validacionExp.expresion ||
      !this.validacionExp.mensajeValidacion
    ) {
      this.mensajeValidaciones = 'No ha diligenciado los campos obligatorios de la validación';
      return;
    }

    this.setValidacionesComponente([
      ...this.getValidacionesComponente(),
      { ...this.validacionExp, entrada: '', cumple: false },
    ]);
    this.validacionExp = this.createValidacionDraft();
    this.mensajeValidaciones = '';
  }

  public eliminarValidacion(nombre: string): void {
    this.setValidacionesComponente(this.getValidacionesComponente().filter((item) => item.nombre !== nombre));
  }

  public cargarValidacionesBD(): void {
    this.modeladorCatalogoService.getValidacionesBD().subscribe((validaciones) => {
      const existentes = this.getValidacionesComponente();
      const nuevas = validaciones.filter((item) => !existentes.some((actual) => actual.nombre === item.nombre));
      this.setValidacionesComponente([...existentes, ...nuevas]);
      this.mensajeValidaciones = `Se cargaron ${nuevas.length} validaciones del catálogo.`;
      this.cdr.detectChanges();
    });
  }

  public guardarValidacionesBD(): void {
    const validaciones = this.getValidacionesComponente();
    if (!validaciones.length) {
      this.mensajeValidaciones = 'No hay validaciones para guardar.';
      return;
    }
    this.modeladorCatalogoService.guardarValidacionesBD(validaciones).subscribe((mensaje) => {
      this.mensajeValidaciones = mensaje;
      this.cdr.detectChanges();
    });
  }

  // ---------------------------------------------------------------- Ventana de entidad foránea

  public abrirVentanaSeleccionEntidad(nombreEntidad: string, columna: ColumnaEntidadEntity): void {
    if (!columna.esLlaveForanea || !columna.entidadRelacionada) {
      return;
    }

    this.columnaForaneaOrigen = `${nombreEntidad}|${columna.nombre}`;
    this.mensajeCondiciones = '';
    this.whereEntidad = '';
    this.condicionesEntidad = [];
    this.columnasMostrablesSeleccionadas = {};

    this.entidadCatalogoService.getEntidadPorNombre(columna.entidadRelacionada).subscribe((entidad) => {
      this.entidadForaneaSeleccionada = entidad ?? null;
      (entidad?.columnas ?? []).forEach((item) => (this.columnasMostrablesSeleccionadas[item.nombre] = false));
      this.mostrarVentanaSeleccionEntidad = true;
      this.cdr.detectChanges();
    });
  }

  public agregarCondicionEntidad(columna: ColumnaEntidadEntity): void {
    const existentes = this.condicionesEntidad.filter((item) => item.atributo === columna.nombre).length;
    this.condicionesEntidad = [
      ...this.condicionesEntidad,
      { identificador: `-${columna.nombre}${existentes + 1}-`, atributo: columna.nombre, operador: '=', valor: '' },
    ];
  }

  public eliminarCondicionEntidad(identificador: string): void {
    this.condicionesEntidad = this.condicionesEntidad.filter((item) => item.identificador !== identificador);
  }

  public cerrarVentanaSeleccionEntidad(): void {
    this.mensajeCondiciones = '';
    if (this.condicionesEntidad.length > 0 && !this.whereEntidad.trim()) {
      this.mensajeCondiciones = 'Debe digitar la sentencia WHERE para las condiciones seleccionadas';
      return;
    }

    const selected = this.getSelectedComponent();
    if (selected && this.entidadForaneaSeleccionada) {
      const labels = Object.keys(this.columnasMostrablesSeleccionadas).filter(
        (nombre) => this.columnasMostrablesSeleccionadas[nombre],
      );
      selected.idColumna = this.columnaForaneaOrigen;
      selected.query = `SELECT model FROM ${this.entidadForaneaSeleccionada.nombre} as model`;
      selected.where = this.whereEntidad;
      selected.listaLabels = labels.join(',');
      selected.condiciones = this.condicionesEntidad.length ? JSON.stringify(this.condicionesEntidad) : '';
    }

    this.mostrarVentanaSeleccionEntidad = false;
  }

  // ---------------------------------------------------------------- Modales de ayuda y link

  public abrirVentanaAyuda(): void {
    this.mostrarVentanaAyuda = true;
  }

  public cerrarVentanaAyuda(): void {
    this.mostrarVentanaAyuda = false;
  }

  public getLinkSeleccionado(): LinkToDifferentFormEntity | null {
    const selected = this.getSelectedComponent();
    return this.isLinkToDifferentFormComponent(selected) ? (selected as LinkToDifferentFormEntity) : null;
  }

  public abrirVentanaConfiguracionLink(): void {
    const link = this.getLinkSeleccionado();
    if (!link) {
      return;
    }

    link.nombresFormularios = link.nombresFormularios ?? [];
    link.tipoFormulario = link.tipoFormulario ?? [];
    link.posicionFormulario = link.posicionFormulario ?? {};

    this.entidadCatalogoService
      .getMetodosValidacionSeleccion(this.formulario.entidadPrincipal)
      .subscribe((metodos) => {
        this.metodosValidacionSeleccion = metodos;
        this.cdr.detectChanges();
      });

    this.mostrarVentanaConfLinkToDifferentForm = true;
  }

  public cerrarVentanaConfiguracionLink(): void {
    this.mostrarVentanaConfLinkToDifferentForm = false;
  }

  public getClavesFormulariosLink(): string[] {
    const posiciones = this.getLinkSeleccionado()?.posicionFormulario ?? {};
    return Object.keys(posiciones).sort((a, b) => Number(posiciones[a]) - Number(posiciones[b]));
  }

  public getPosicionFormularioLink(clave: string): string {
    return this.getLinkSeleccionado()?.posicionFormulario?.[clave] ?? '';
  }

  public getNombreFormularioLink(clave: string): string {
    const link = this.getLinkSeleccionado();
    const posicion = Number(link?.posicionFormulario?.[clave] ?? -1);
    return link?.nombresFormularios?.[posicion] ?? '';
  }

  public isFormularioConsultaLink(clave: string): boolean {
    const link = this.getLinkSeleccionado();
    const posicion = Number(link?.posicionFormulario?.[clave] ?? -1);
    return link?.tipoFormulario?.[posicion] === 'true';
  }

  public agregarFormularioLink(): void {
    const link = this.getLinkSeleccionado();
    if (!link) {
      return;
    }

    const esConsulta = this.tipoFormularioEscogido === 'consulta';
    const nombre = esConsulta ? this.nombreFormularioConsultaLink : this.nombreFormularioLink;
    if (!nombre) {
      return;
    }

    const clave = `${nombre}${esConsulta}`;
    if (link.posicionFormulario?.[clave] !== undefined) {
      return;
    }

    const posicion = (link.nombresFormularios ?? []).length;
    link.nombresFormularios = [...(link.nombresFormularios ?? []), nombre];
    link.tipoFormulario = [...(link.tipoFormulario ?? []), esConsulta ? 'true' : 'false'];
    link.posicionFormulario = { ...(link.posicionFormulario ?? {}), [clave]: String(posicion) };
  }

  public eliminarFormularioLink(clave: string): void {
    const link = this.getLinkSeleccionado();
    if (!link?.posicionFormulario) {
      return;
    }

    const posicion = Number(link.posicionFormulario[clave]);
    if (Number.isNaN(posicion)) {
      return;
    }

    const posiciones: { [clave: string]: string } = {};
    Object.entries(link.posicionFormulario)
      .filter(([claveActual]) => claveActual !== clave)
      .forEach(([claveActual, valor]) => {
        const actual = Number(valor);
        posiciones[claveActual] = String(actual > posicion ? actual - 1 : actual);
      });

    link.nombresFormularios = (link.nombresFormularios ?? []).filter((_, indice) => indice !== posicion);
    link.tipoFormulario = (link.tipoFormulario ?? []).filter((_, indice) => indice !== posicion);
    link.posicionFormulario = posiciones;
  }

  // ---------------------------------------------------------------- Acciones del formulario

  public guardarFormulario(): void {
    if (!this.validarCamposObligatorios()) {
      return;
    }

    this.modelarFormConsultaService.guardarFormulario(this.formulario).subscribe({
      next: () => {
        this.mensaje = 'Formulario de consulta guardado correctamente.';
        this.mensajes = [this.mensaje, ...this.mensajes].slice(0, 5);
      },
      error: (error) => {
        this.mensaje = MessageUtil.buildErrorMessageFrmResponse(
          'No fue posible guardar el formulario de consulta.',
          error,
        );
        this.mensajes = [this.mensaje, ...this.mensajes].slice(0, 5);
      },
    });
  }

  public limpiarCampos(): void {
    this.mensajes = [];
    this.mensaje = '';
    this.mensajeValidaciones = '';
    this.mensajeColumna = '';
    this.mensajesObservadores = [];
    this.validacionExp = this.createValidacionDraft();
    this.atributoSeleccionado = null;
    this.selectedComponentKey = '';
  }

  public validarCamposObligatorios(): boolean {
    this.mensajes = [];
    if (!this.formulario.titulo) {
      this.addMensaje('Debe escribir un título para el formulario');
      return false;
    }
    if (!this.formulario.nombreUnicoFormulario) {
      this.addMensaje('Debe escribir un nombre único que identifique al formulario');
      return false;
    }
    if (!/^[a-zA-Z\-_0-9]+$/.test(this.formulario.nombreUnicoFormulario)) {
      this.addMensaje('El nombre único del formulario solo puede tener caracteres de la a-z, A-Z, 0-9, "-" ó "_".');
      return false;
    }
    if (!this.formulario.entidadPrincipal) {
      this.addMensaje('Debe seleccionar la entidad principal del formulario');
      return false;
    }
    if (this.getColumnasOrganizadas().length === 0) {
      this.addMensaje('Debe definir al menos una columna del resultado de la consulta');
      return false;
    }
    return true;
  }

  public addMensaje(message: string): void {
    if (message) {
      this.mensajes = [message, ...this.mensajes].slice(0, 5);
    }
  }

  // ---------------------------------------------------------------- Fábricas

  private buildComponentEntity(componentType: string, componentKey: string): ComponenteBaseEntity {
    return {
      cambiado: 'false',
      observadores: '',
      nombre: componentKey,
      tipoDato: 'text',
      tipoComponente: componentType,
      descripcion: '',
      ultimoId: '',
      obligatorio: 'false',
      obligatorioFuncional: 'false',
      readOnly: 'false',
      guardado: 'false',
      cumpleValidaciones: 'true',
      opcionExtra: 'false',
      integerType: 'false',
      textType: ['InPutText', 'InPutTextArea'].includes(componentType) ? 'true' : 'false',
      dateType: componentType === 'SelectInPutDate' ? 'true' : 'false',
      separadorType: componentType === 'Separador' ? 'true' : 'false',
      checkBoxType: componentType === 'SelectBooleanCheckBox' ? 'true' : 'false',
      textAreaType: componentType === 'InPutTextArea' ? 'true' : 'false',
      listBoxType: componentType === 'SelectOneListBox' ? 'true' : 'false',
      listBoxCustomizedType: componentType === 'SelectOneListBoxCustomized' ? 'true' : 'false',
      radioButtonType: componentType === 'SelectOneRadioButton' ? 'true' : 'false',
      listCompuestaType: 'false',
      grillaType: 'false',
      labelType: 'false',
      cargaMasivaType: 'false',
      mailType: 'false',
      searchButtonType: componentType === 'SearchButton' ? 'true' : 'false',
      refreshButtonType: componentType === 'RefreshButton' ? 'true' : 'false',
      saveButtonType: 'false',
      linkType: ['OutPutLink', 'LinkToAForm', 'LinkToDifferentForm'].includes(componentType) ? 'true' : 'false',
      linkToAFormType: componentType === 'LinkToAForm' ? 'true' : 'false',
      linkToDifferentFormType: componentType === 'LinkToDifferentForm' ? 'true' : 'false',
      linkFormToIfacesType: 'false',
      validacionesExpresiones: '',
      style: `width:${this.defaultFieldWidth}%;`,
      styleClass: '',
      styleContenedor: `width:${this.defaultContainerWidth}%;`,
      styleClassContenedor: '',
      columnClasses: `width${this.defaultLabelWidth},width${this.defaultFieldColumnWidth}`,
      claseEstilo: componentType,
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
      query: '',
      select: '',
      where: '',
      whereTemp: '',
      whereCon: '',
      condiciones: '',
      listaAtributosResticcion: '',
      mapaCondiciones: '',
      consultaGenerica: '',
      listaIdentificadores: '',
      listaLabels: '',
      labelOrganizable: '',
      mapaAtributos: '',
      orderBy: '',
      pagSize: '',
      orientacion: componentType === 'SelectOneRadioButton' ? 'lineDirection' : '',
      mostrarLink: 'false',
      utilizaImagen: 'false',
      nombreEntidad: '',
      nombreFormulario: '',
      nombreFormularioEdicion: '',
      mostrarBotonAgregar: 'false',
      mostrarBotonBuscar: 'false',
      mostrarBotonEliminar: 'false',
      cantidadMinima: '',
      mensajeError: '',
      posicionesNombres: {},
      formatosColumnas: {},
      nombresOrganizados: {},
      nombresColumnas: {},
      nombresColumnasTabla: {},
      listValuesForSortQuery: {},
      valueSelectedSort: '',
      textoHTMLTabla: '',
      archivoConfString: '',
      nameArchivoConf: '',
      nombreClaseCarga: '',
      atributosSeleccionadosTransportar: [],
      nombreAtributoLista: '',
      nombreAtributoSeleccionado: '',
    };
  }

  private createDefaultForm(): FormularioConsultaJSONEntity {
    return {
      titulo: 'Formulario de consulta',
      nombreUnicoFormulario: '',
      descripcion: 'Diseño de formulario de consulta',
      seccionesFormularioConsulta: {},
      entidades: {},
      entidadPrincipal: '',
      entidadesRelacionadas: {},
      idFormularioPadre: 'vacio',
      nuevo: 'false',
      edicion: 'false',
      eliminable: 'false',
      diligenciable: 'false',
      consultable: 'true',
      plantillasMostrables: 'false',
      permitirGraficas: 'false',
      htmlAyuda: '',
      nombreFormularioVisualizacion: '',
      nombresColumnasTabla: [],
      nombresColumnasOrganizadas: [],
      nombresColumnas: {},
      formatosColumnas: {},
      posicionesNombres: {},
      nombresColumnasRelacionadasMostrar: {},
      pageSize: '10',
    };
  }
}
