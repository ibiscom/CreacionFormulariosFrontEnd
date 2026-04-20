import { Component, Input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PlantillaFormCapturaComponent } from '../plantilla-form-captura.component';
import { MatIconModule } from '@angular/material/icon';
import { FileUtil } from '../../../../utilidades/file.util';
import { FileUploadEntity } from '../../../../entidades/forms-captura/file-upload.entity';

@Component({
  selector: 'frm-file-upload',
  imports: [MatFormFieldModule, MatInputModule, MatIconModule],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss',
})
export class FileUploadComponent {
  @Input() public fileUploadEntity?: FileUploadEntity;
  @Input() public verFormularioCmp?: PlantillaFormCapturaComponent;
  private uploadedFileBase64?: string = undefined;
  public selectedFileName: string = '';

  constructor() {}

  public ngOnInit(): void {
    console.debug('File Upload Entity:', this.fileUploadEntity);
  }

  public async uploadFile(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      this.selectedFileName = file.name;
      this.uploadedFileBase64 = await FileUtil.convertToBase64File(file);

      //TODO Acciones adicionales sobre el formualario.
    }
  }
}
