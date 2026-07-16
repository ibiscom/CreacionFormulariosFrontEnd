import { Routes } from '@angular/router';
import { ListaFormsCapturaComponent } from './modulos/captura/lista-forms-captura/lista-forms-captura.component';
import { VerFormCapturaComponent } from './modulos/captura/ver-form-captura/ver-form-captura.component';
import { DiligenciarFormCapturaComponent } from './modulos/captura/diligenciar-form-captura/diligenciar-form-captura.component';
import { PlantillaFormularioNormalHtmComponent } from './modulos/htm/plantilla-formulario-normal-htm/plantilla-formulario-normal-htm.component';
import { PlantillaFormularioHtmComponent } from './modulos/htm/plantilla-formulario-htm/plantilla-formulario-htm.component';
import { ListaFormsConsultaComponent } from './modulos/consulta/lista-forms-consulta/lista-forms-consulta.component';
import { ConsultarFormConsultaComponent } from './modulos/consulta/consultar-form-consulta/consultar-form-consulta.component';
import { PlantillaFormularioConsultaHtmComponent } from './modulos/htm/plantilla-formulario-consulta-htm/plantilla-formulario-consulta-htm.component';
import { InvocarComponenteCapturaComponent } from './modulos/htm/invocar-componente-captura/invocar-componente-captura.component';
import { InvocarFormularioConsultaComponent } from './modulos/htm/invocar-formulario-consulta/invocar-formulario-consulta.component';
import { PlantillaFormularioConsultaNormalHtmComponent } from './modulos/htm/plantilla-formulario-consulta-normal-htm/plantilla-formulario-consulta-normal-htm.component';
import { InvocarFormularioEvtInicioComponent } from './modulos/htm/invocar-formulario-evt-inicio/invocar-formulario-evt-inicio.component';

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
    path: 'consulta',
    children: [
      {
        path: '',
        redirectTo: 'lista-forms-consulta', 
        pathMatch: 'full',
      },
      {
        path: 'lista-forms-consulta',
        component: ListaFormsConsultaComponent,
        children: [],
      },
      {
        path: 'consultar-form-consulta/:id',
        component: ConsultarFormConsultaComponent,
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
      path: 'invocar-componente-captura/:id',
      component: InvocarComponenteCapturaComponent,
      children: [],
    },
    {
      path: 'invocar-formulario-consulta/:id',
      component: InvocarFormularioConsultaComponent,
      children: [],
    },
    {
      path: 'invocar-formulario-evt-inicio/:id',
      component: InvocarFormularioEvtInicioComponent,
      children: [],
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
    {
      path: 'plantilla-formulario-consulta-normal-htm',
      component: PlantillaFormularioConsultaNormalHtmComponent,
      children: [], 
    }
   ]
  },  
];
