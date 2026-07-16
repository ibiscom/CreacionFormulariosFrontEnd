import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ConsultarFormConsultaComponent } from '../consultar-form-consulta/consultar-form-consulta.component';
import { ListaFormsConsultaComponent } from './lista-forms-consulta.component';

@NgModule({
  declarations: [],
  imports: [CommonModule, FormsModule, RouterModule, ListaFormsConsultaComponent, ConsultarFormConsultaComponent, ListaFormsConsultaComponent],
  exports: [ListaFormsConsultaComponent, ConsultarFormConsultaComponent],
})
export class ListaFormsConsultaModule {}
