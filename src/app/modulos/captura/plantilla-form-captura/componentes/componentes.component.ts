import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PlantillaFormCapturaComponent } from '../plantilla-form-captura.component';
import { InPutTextComponent } from '../in-put-text/in-put-text.component';
import { SearchButtonComponent } from '../search-button/search-button.component';
import { InPutTextAreaComponent } from '../in-put-text-area/in-put-text-area.component';
import { InPutRichTextComponent } from '../in-put-rich-text/in-put-rich-text.component';
import { FileUploadComponent } from '../file-upload/file-upload.component';
import { SelectBooleanCheckBoxComponent } from '../select-boolean-check-box/select-boolean-check-box.component';
import { SelectOneListBoxComponent } from '../select-one-list-box/select-one-list-box.component';
import { SelectInPutDateComponent } from '../select-in-put-date/select-in-put-date.component';
import { SelectOneListBoxCustomizedComponent } from '../select-one-list-box-customized/select-one-list-box-customized.component';
import { LabelComponent } from '../label/label.component';
import { SeparadorComponent } from '../separador/separador.component';
import { LinkToAFormComponent } from '../link-to-a-form/link-to-a-form.component';
import { LinkToDifferentFormComponent } from '../link-to-different-form/link-to-different-form.component';
import { LinkFormToIcefacesComponent } from '../link-form-to-icefaces/link-form-to-icefaces.component';
import { MailComponent } from '../mail/mail.component';
import { RefreshButtonComponent } from '../refresh-button/refresh-button.component';
import { SaveButtonComponent } from '../save-button/save-button.component';
import { TableSQLQueryComponent } from '../table-s-q-l-query/table-s-q-l-query.component';
import { TableDetailsComponent } from '../table-details/table-details.component';
import { OutPutLinkComponent } from '../out-put-link/out-put-link.component';
import { SelectOneRadioComponent } from '../select-one-radio/select-one-radio.component';
import { CargaMasivaComponent } from '../carga-masiva/carga-masiva.component';
import { ListaCompuestaComponent } from '../lista-compuesta/lista-compuesta.component';
import { ComponentesEntity } from '../../../../entidades/forms-captura/componentes.entity';
import { ComponenteBaseEntity } from '../../../../entidades/forms-captura/componente-base.entity';

@Component({
  selector: 'frm-componentes',
  imports: [
    InPutTextComponent,
    SearchButtonComponent,
    InPutTextAreaComponent,
    InPutRichTextComponent,
    FileUploadComponent,
    SelectBooleanCheckBoxComponent,
    SelectOneListBoxComponent,
    SelectInPutDateComponent,
    SelectOneListBoxCustomizedComponent,
    LabelComponent,
    SeparadorComponent,
    LinkToAFormComponent,
    LinkToDifferentFormComponent,
    LinkFormToIcefacesComponent,
    MailComponent,
    RefreshButtonComponent,
    SaveButtonComponent,
    TableSQLQueryComponent,
    TableDetailsComponent,
    OutPutLinkComponent,
    SelectOneRadioComponent,
    CargaMasivaComponent,
    ListaCompuestaComponent,
  ],
  templateUrl: './componentes.component.html',
  styleUrl: './componentes.component.scss',
})
export class ComponentesComponent {
  @Input() public componentes: ComponentesEntity | '' = '';
  @Input() public verFormularioCmp?: PlantillaFormCapturaComponent;
  @Input() public isModeling = false;
  @Input() public sectionKey = '';
  @Output() public componenteSeleccionado = new EventEmitter<string>();
  @Output() public componenteReordenado = new EventEmitter<{ sourceKey: string; targetKey: string; sectionKey: string }>();

  public activeDropTargetKey = '';

  public constructor() {}

  ngOnInit(): void {
    console.debug('Componentes:', this.componentes);
  }

  /**
   * Obtiene todas las claves de componentes dinámicos de la entidad de componentes
   */
  public getComponentKeys(): string[] {
    if (this.componentes === '') {
      return [];
    }
    //console.debug("Component Keys:", Object.keys(this.componentes));
    return Object.keys(this.componentes);
  }

  /**
   * Obtiene los datos del componente para una clave específica
   */
  public getComponentData(key: string): ComponenteBaseEntity | ComponenteBaseEntity[] | undefined {
    if (this.componentes === '') {
      return undefined;
    }
    return (this.componentes as ComponentesEntity)[key];
  }

  /**
   * Verifica si los datos son un componente único (no un arreglo)
   */
  public isComponent(
    data: ComponenteBaseEntity | ComponenteBaseEntity[] | undefined,
  ): data is ComponenteBaseEntity {
    return (
      data !== undefined &&
      !Array.isArray(data) &&
      typeof data === 'object' &&
      'tipoComponente' in data
    );
  }

  /**
   * Verifica si los datos son un arreglo de componentes
   */
  public isComponentArray(
    data: ComponenteBaseEntity | ComponenteBaseEntity[] | undefined,
  ): data is ComponenteBaseEntity[] {
    return (
      Array.isArray(data) &&
      data.length > 0 &&
      data.every((item) => typeof item === 'object' && item !== null && 'tipoComponente' in item)
    );
  }

  public seleccionarComponente(key: string): void {
    this.componenteSeleccionado.emit(key);
  }

  public dragComponent(key: string, event: DragEvent): void {
    const payload = `component:${key}`;
    if (event.dataTransfer) {
      event.dataTransfer.setData('text/plain', payload);
      event.dataTransfer.setData('application/x-component-key', payload);
      event.dataTransfer.effectAllowed = 'move';
    }
  }

  public allowDrop(event: DragEvent): void {
    event.preventDefault();
  }

  public onComponentDragEnter(targetKey: string): void {
    this.activeDropTargetKey = targetKey;
  }

  public onComponentDragLeave(targetKey: string, event: DragEvent): void {
    if (event.relatedTarget && (event.relatedTarget as Node).parentElement?.closest('.component-render-wrapper')) {
      return;
    }

    if (this.activeDropTargetKey === targetKey) {
      this.activeDropTargetKey = '';
    }
  }

  public isDropTarget(targetKey: string): boolean {
    return this.activeDropTargetKey === targetKey;
  }

  public dropComponent(targetKey: string, event: DragEvent): void {
    this.allowDrop(event);
    this.activeDropTargetKey = '';
    event.stopPropagation();
    const data =
      event.dataTransfer?.getData('application/x-component-key') ||
      event.dataTransfer?.getData('text/plain') ||
      '';
    if (!data.startsWith('component:')) {
      return;
    }

    const sourceKey = data.replace('component:', '');
    if (!sourceKey || sourceKey === targetKey) {
      return;
    }

    this.componenteReordenado.emit({ sourceKey, targetKey, sectionKey: this.sectionKey });
  }
}
