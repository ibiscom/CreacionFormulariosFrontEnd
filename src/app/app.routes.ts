import { Routes } from '@angular/router';
import { VerFormularioComponent } from './ver-formulario/ver-formulario.component';
import { VisorComponent } from './ver-formulario/visor/visor.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/ver-formulario',
    pathMatch: 'full',
  },
  {
    path: 'ver-formulario',
    component: VerFormularioComponent,
    children: [
      {
        path: '',
        redirectTo: 'visor',
        pathMatch: 'full',
      },
      {
        path: 'visor',
        component: VisorComponent,
      },
    ],
  },
];
