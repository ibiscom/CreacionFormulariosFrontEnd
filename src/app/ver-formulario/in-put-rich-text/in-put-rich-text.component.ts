import { Component, Input, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { VerFormularioComponent } from '../ver-formulario.component';
import { InPutRichTextEntity } from '../../entities/ver-formulario/in-put-rich-text.entity';

@Component({
  selector: 'frm-in-put-rich-text',
  imports: [CKEditorModule, MatFormFieldModule, MatInputModule],
  templateUrl: './in-put-rich-text.component.html',
  styleUrl: './in-put-rich-text.component.scss',
  host: { ngSkipHydration: '' },
})
export class InPutRichTextComponent implements OnInit {
  @Input() public inPutRichTextEntity?: InPutRichTextEntity;
  @Input() public verFormularioCmp?: VerFormularioComponent;

  public editorData: string = '';
  public editor: any;
  public editorConfig: any = { language: 'es', licenseKey: 'GPL' };
  public isBrowser: boolean = false; // Inicializar en false para seguridad de SSR
  public capturedData: string = '';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  async ngOnInit(): Promise<void> {
    console.log('Input Rich Text:', this.inPutRichTextEntity);
    this.editorData = this.inPutRichTextEntity?.valor?.[''] || '';
    
    // Solo cargar CKEditor en el lado del navegador
    if (this.isBrowser) {
      try {
        const { default: ClassicEditor } = await import('@ckeditor/ckeditor5-build-classic');
        this.editor = ClassicEditor;
        this.editorConfig = { language: 'es', licenseKey: 'GPL' };
      } catch (err) {
        console.error('CKEditor load failed, falling back to textarea', err);
        this.editor = undefined;
      }
    }
  }

  

  public onReady(editorInstance: any) {
    console.log('Editor is ready to use!', editorInstance);
    this.capturedData = editorInstance.getData();
  }

  public onEditorChange($event: any) {
  // this.editorData = $event.editor.getData();
  this.capturedData = $event.editor.getData();
    console.log('Editor data changed:', this.capturedData);
  }

  public onTextareaInput(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    if (target) {
      this.editorData = this.normalizeRtl(target.value);
      console.log('Textarea data changed:', this.editorData);
    }
  }

  private forceRootLtr(editorInstance: any): void {
    // no-op
  }

  private setCursorToEnd(editorInstance: any): void {
    const model = editorInstance?.model;
    const root = model?.document?.getRoot();
    if (!model || !root) return;
    model.change((writer: any) => {
      const endPosition = writer.createPositionAt(root, 'end');
      writer.setSelection(endPosition);
    });
  }

  // Strip any RTL directions that may come from stored content or inline styles
  public normalizeRtl(value: string): string {
    return value || '';
  }

  public sanitizedStyle(): string | undefined {
    const raw = this.inPutRichTextEntity?.style;
    return raw;
  }

  public sanitizedContainerStyle(): string | undefined {
    const raw = this.inPutRichTextEntity?.styleContenedor as string | undefined;
    return raw;
  }
}
