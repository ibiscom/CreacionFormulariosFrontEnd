import { Routes } from '@angular/router';
import { ListaFormsCapturaComponent } from './modulos/captura/lista-forms-captura/lista-forms-captura.component';
import { VerFormCapturaComponent } from './modulos/captura/ver-form-captura/ver-form-captura.component';
import { DiligenciarFormCapturaComponent } from './modulos/captura/diligenciar-form-captura/diligenciar-form-captura.component';
import { PlantillaFormularioNormalHtmComponent } from './modulos/htm/plantilla-formulario-normal-htm/plantilla-formulario-normal-htm.component';
import { PlantillaFormularioHtmComponent } from './modulos/htm/plantilla-formulario-htm/plantilla-formulario-htm.component';

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
  {
   path:'htm',
   children:[
    { 
      path: '',
      redirectTo: 'plantilla-formulario-normal-htm', 
      pathMatch: 'full',
    },
    {
      path: 'plantilla-formulario-htm',
      component: PlantillaFormularioHtmComponent,
      children: [],
    },
    {
      path: 'plantilla-formulario-normal-htm',
      component: PlantillaFormularioNormalHtmComponent,
      children: [],
    },
   ]
  },  
];
