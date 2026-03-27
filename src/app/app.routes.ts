import { Routes } from '@angular/router';
import { VerFormularioComponent } from './ver-formulario/ver-formulario.component';
import { VisorComponent } from './ver-formulario/visor/visor.component';
import { ListaFormulariosComponent } from './lista-formularios/lista-formularios.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/lista-formularios',
    pathMatch: 'full',
  },
  {
    path: 'ver-formulario/:id',
    component: VerFormularioComponent,
    children: [
      {
        path: '',
        component: VisorComponent,
      },
    ],
  },
  {
    path: 'lista-formularios',
    component: ListaFormulariosComponent,
    children: [],
  },
];
