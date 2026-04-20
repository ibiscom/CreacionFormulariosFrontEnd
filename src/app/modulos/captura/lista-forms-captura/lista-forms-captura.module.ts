import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ListaFormsCapturaComponent } from './lista-forms-captura.component';
import { DiligenciarFormCapturaComponent } from '../diligenciar-form-captura/diligenciar-form-captura.component';
import { VerFormCapturaComponent } from '../ver-form-captura/ver-form-captura.component';

@NgModule({
  declarations: [],
  imports: [CommonModule, FormsModule, RouterModule, ListaFormsCapturaComponent, DiligenciarFormCapturaComponent, VerFormCapturaComponent],
  exports: [ListaFormsCapturaComponent, DiligenciarFormCapturaComponent, VerFormCapturaComponent],
})
export class ListaFormsCapturaModule {}
