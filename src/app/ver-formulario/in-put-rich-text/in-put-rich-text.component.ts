import {
  Component,
  Input,
  Inject,
  PLATFORM_ID,
  OnInit,
  OnDestroy,
  ElementRef,
} from '@angular/core';
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
export class InPutRichTextComponent implements OnInit, OnDestroy {
  @Input() public inPutRichTextEntity?: InPutRichTextEntity;
  @Input() public verFormularioCmp?: VerFormularioComponent;

  public editorData: string = '';
  public editor: any;
  public editorConfig: any = { language: 'es', licenseKey: 'GPL' };
  public isBrowser: boolean = false; // Inicializar en false para seguridad de SSR
  public capturedData: string = '';
  private editorResizeObserver?: ResizeObserver;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private hostElementRef: ElementRef<HTMLElement>,
  ) {
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
    this.applyEditorLayout(editorInstance);
  }

  public onEditorChange($event: any) {
    this.capturedData = $event.editor.getData();
    //console.log('Editor data changed:', this.capturedData);
  }

  ngOnDestroy(): void {
    this.editorResizeObserver?.disconnect();
    this.editorResizeObserver = undefined;
  }

  public sanitizedStyle(): string | undefined {
    const raw = this.inPutRichTextEntity?.style;
    return raw;
  }

  public sanitizedContainerStyle(): string | undefined {
    const raw = this.inPutRichTextEntity?.styleContenedor as string | undefined;
    console.log('Container style:', raw);
    return raw;
  }

  private applyEditorLayout(editorInstance: any): void {
    if (!this.isBrowser) {
      return;
    }

    requestAnimationFrame(() => {
      const editableElement = editorInstance?.ui?.getEditableElement?.() as HTMLElement | null;
      const toolbarElement = editorInstance?.ui?.view?.toolbar?.element as HTMLElement | null;
      const editorElement = editableElement?.closest('.ck-editor') as HTMLElement | null;
      const editorMainElement = editableElement?.closest('.ck-editor__main') as HTMLElement | null;
      const editorTopElement = toolbarElement?.closest('.ck-editor__top') as HTMLElement | null;
      const stickyPanelElement = toolbarElement?.closest('.ck-sticky-panel') as HTMLElement | null;
      const stickyPanelContentElement = toolbarElement?.closest(
        '.ck-sticky-panel__content',
      ) as HTMLElement | null;
      const richTextFieldElement = this.hostElementRef.nativeElement.querySelector(
        '.rich-text-field',
      ) as HTMLElement | null;

      const setElementWidth = (element: HTMLElement | null, width: string): void => {
        if (!element) {
          return;
        }

        element.style.display = 'block';
        element.style.setProperty('width', width, 'important');
        element.style.setProperty('max-width', width, 'important');
        element.style.setProperty('box-sizing', 'border-box', 'important');
      };

      const syncWidths = (): void => {
        const widthSource = richTextFieldElement ?? editorElement ?? editableElement;
        const sourceRect = widthSource?.getBoundingClientRect();
        const sourceWidth = sourceRect ? Math.floor(sourceRect.width) : 0;
        if (sourceWidth <= 0) {
          return;
        }

        const syncedWidth = `${sourceWidth}px`;

        setElementWidth(editorElement, syncedWidth);
        setElementWidth(editorTopElement, syncedWidth);
        setElementWidth(stickyPanelElement, syncedWidth);
        setElementWidth(stickyPanelContentElement, syncedWidth);
        setElementWidth(editorMainElement, syncedWidth);
        setElementWidth(toolbarElement, syncedWidth);
        setElementWidth(editableElement, syncedWidth);

        if (editableElement) {
          editableElement.style.setProperty('padding-left', '0', 'important');
          editableElement.style.setProperty('padding-right', '0', 'important');
        }

        if (toolbarElement) {
          toolbarElement.style.setProperty('flex-wrap', 'wrap', 'important');
        }
      };

      syncWidths();

      this.editorResizeObserver?.disconnect();
      this.editorResizeObserver = new ResizeObserver(() => {
        syncWidths();
      });

      if (richTextFieldElement) {
        this.editorResizeObserver.observe(richTextFieldElement);
      } else if (editorElement) {
        this.editorResizeObserver.observe(editorElement);
      }
    });
  }
}
