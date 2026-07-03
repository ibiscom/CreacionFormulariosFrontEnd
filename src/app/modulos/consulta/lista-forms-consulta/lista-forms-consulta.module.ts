import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { DiligenciarFormConsultaComponent } from '../diligenciar-form-consulta/diligenciar-form-consulta.component';
import { ListaFormsConsultaComponent } from './lista-forms-consulta.component';

@NgModule({
  declarations: [],
  imports: [CommonModule, FormsModule, RouterModule, ListaFormsConsultaComponent, DiligenciarFormConsultaComponent, VerFormConsultaComponent],
  exports: [ListaFormsConsultaComponent, DiligenciarFormConsultaComponent, VerFormConsultaComponent],
})
export class ListaFormsConsultaModule {}
