import { Routes } from '@angular/router';
import { ListaFormsCapturaComponent } from './modulos/captura/lista-forms-captura/lista-forms-captura.component';
import { VerFormCapturaComponent } from './modulos/captura/ver-form-captura/ver-form-captura.component';
import { DiligenciarFormCapturaComponent } from './modulos/captura/diligenciar-form-captura/diligenciar-form-captura.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'captura',
    pathMatch: 'full',
  },
  {
    path: 'captura',
    children: [
      {
        path: '',
        redirectTo: 'lista-forms-captura', 
        pathMatch: 'full',
      },
      {
          path: 'ver-form-captura/:id',
          component: VerFormCapturaComponent,
          children: [],
      },
      {
          path: 'diligenciar-form-captura/:id',
          component: DiligenciarFormCapturaComponent,
          children: [],
      },
      {
          path: 'lista-forms-captura',
          component: ListaFormsCapturaComponent,
          children: [],
      },
    ]
  },
  
];
