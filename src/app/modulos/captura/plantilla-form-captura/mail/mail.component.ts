import { Component, Input, ChangeDetectionStrategy, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { PlantillaFormCapturaComponent } from '../plantilla-form-captura.component';
import { MailEntity } from '../../../../entidades/forms-captura/mail.entity';

@Component({
  selector: 'frm-mail',
  imports: [FormsModule, CKEditorModule],
  templateUrl: './mail.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './mail.component.scss',
  host: { ngSkipHydration: '' },
})
export class MailComponent implements OnInit {
  @Input() public mailEntity?: MailEntity;
  @Input() public verFormularioCmp?: PlantillaFormCapturaComponent;

  public editor: unknown;
  public editorConfig: Record<string, unknown> = { language: 'es', licenseKey: 'GPL' };
  public isBrowser = false;

  public constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  public async ngOnInit(): Promise<void> {
    console.debug('Mail:', this.mailEntity);

    // El editor solo se carga si el componente está configurado con plantilla HTML.
    if (this.isBrowser && this.utilizaPlantillaHTML) {
      try {
        const { default: ClassicEditor } = await import('@ckeditor/ckeditor5-build-classic');
        this.editor = ClassicEditor;
      } catch (err) {
        console.error('CKEditor load failed, falling back to textarea', err);
        this.editor = undefined;
      }
    }
  }

  public get abiertoPopup(): boolean {
    return this.mailEntity?.abiertoPoPup === 'true';
  }

  public get utilizaPlantillaHTML(): boolean {
    return this.mailEntity?.utilizaPlantillaHTML === 'true';
  }

  public get permiteModificarParametros(): boolean {
    return this.mailEntity?.permiteModificarParametros === 'true';
  }

  public get permiteAdjuntarArchivos(): boolean {
    return this.mailEntity?.permiteAdjuntarArchivos === 'true';
  }

  public get permitirEnvioManual(): boolean {
    return this.mailEntity?.permitirEnvioManual === 'true';
  }

  public get mensajes(): string[] {
    return this.mailEntity?.mensajes ?? [];
  }

  public get archivosAdjuntos(): string[] {
    return this.mailEntity?.nombresArchivosAdjuntos ?? [];
  }

  public abrirInformacionMail(): void {
    if (!this.mailEntity) {
      return;
    }
    this.mailEntity.abiertoPoPup = 'true';
  }

  public cerrarInformacionMail(): void {
    if (!this.mailEntity) {
      return;
    }
    this.mailEntity.abiertoPoPup = 'false';
  }

  public actualizarParametro(propiedad: keyof MailEntity, valor: string): void {
    if (!this.mailEntity) {
      return;
    }
    (this.mailEntity as unknown as Record<string, unknown>)[propiedad] = valor;
  }

  public agregarArchivos(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!this.mailEntity || !input.files?.length) {
      return;
    }

    const nuevos = Array.from(input.files).map((archivo) => archivo.name);
    this.mailEntity.nombresArchivosAdjuntos = [...this.archivosAdjuntos, ...nuevos];
    input.value = '';
  }

  public eliminarArchivo(nombreArchivo: string): void {
    if (!this.mailEntity) {
      return;
    }
    this.mailEntity.nombresArchivosAdjuntos = this.archivosAdjuntos.filter((item) => item !== nombreArchivo);
  }

  public enviarMail(): void {
    console.debug('Enviar mail:', this.mailEntity);
  }
}
