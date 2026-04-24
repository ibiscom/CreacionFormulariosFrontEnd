import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-ayuda',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './dialog-ayuda.component.html',
  styleUrl: './dialog-ayuda.component.scss',
})
export class DialogAyudaComponent {
  public nombreFormulario: string = '';
  public contenidoAyuda: string = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { 
  }

  ngOnInit(): void {
    this.nombreFormulario = this.data.nombreFormulario;
    this.contenidoAyuda = this.data.contenidoAyuda;
  }

}
