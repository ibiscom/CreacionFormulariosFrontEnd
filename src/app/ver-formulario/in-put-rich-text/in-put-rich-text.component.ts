import { Component, Input, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import type { Editor } from '@ckeditor/ckeditor5-core';
import { VerFormularioComponent } from '../ver-formulario.component';
import { InPutRichTextEntity } from '../../entities/ver-formulario/in-put-rich-text.entity';

@Component({
  selector: 'frm-in-put-rich-text',
  imports: [CKEditorModule, MatFormFieldModule, MatInputModule],
  templateUrl: './in-put-rich-text.component.html',
  styleUrl: './in-put-rich-text.component.scss',
})
export class InPutRichTextComponent implements OnInit {
  @Input() public inPutRichTextEntity?: InPutRichTextEntity;
  @Input() public verFormularioCmp?: VerFormularioComponent;

  public editorData: string = '';
  public editor: any;
  public isBrowser: boolean = false; // Inicializar en false para seguridad de SSR

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  async ngOnInit(): Promise<void> {
    console.log('Input Rich Text:', this.inPutRichTextEntity);
    this.editorData = this.inPutRichTextEntity?.valor?.[''] || '';
    
    // Solo cargar CKEditor en el lado del navegador
    if (this.isBrowser) {
      const { default: ClassicEditor } = await import('@ckeditor/ckeditor5-build-classic');
      this.editor = ClassicEditor;
    }
  }

  public onReady($event: any) {
    console.log('Editor is ready to use!', $event);
  }

  public onEditorChange($event: any) {
    this.editorData = $event.editor.getData();
    console.log('Editor data changed:', this.editorData);
  }

  public onTextareaInput(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    if (target) {
      this.editorData = target.value;
      console.log('Textarea data changed:', this.editorData);
    }
  }
}
