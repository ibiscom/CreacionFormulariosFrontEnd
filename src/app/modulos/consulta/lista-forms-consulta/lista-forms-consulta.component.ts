import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';

import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ListaFormulariosConsultaService } from './lista-forms-consulta.service';

@Component({
  selector: 'app-lista-forms-consulta',
  imports: [
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    FormsModule,
  ],
  templateUrl: './lista-forms-consulta.component.html',
  styleUrl: './lista-forms-consulta.component.scss',
})
export class ListaFormsConsultaComponent {
  public filtroFormulario: string = '';
  public dataSource: any[] = [];
  public displayedColumns: any;
  public pageIndex: number = 0;
  public pageSize: number = 10;
  public nombreFormulario: string = '';

  ngOnInit(): void {
    this.consultarFormularios();
  }

  public constructor(
    private listaFormulariosConsultaService: ListaFormulariosConsultaService,
    private router: Router,
  ) {}

  public mensaje(): string {
    return '';
  }

  public total(): number {
    return 0;
  }

  public pageChanged($event: PageEvent) {
    console.debug('Method not implemented.');
  }
  
  public verReporte() {
    console.debug('Method not implemented.');
  }
  
  public consultarFormularios() {
    this.listaFormulariosConsultaService.getFormularios(this.filtroFormulario).subscribe({
      next: (response) => {
        this.dataSource = response.respuesta || [];
        this.displayedColumns = ['nombre', 'editar', 'consultar', 'eliminar'];
      },
      error: (error) => {
        console.error('Error al consultar los formularios:', error);
        this.dataSource = [];
        this.displayedColumns = ['nombre', 'editar', 'consultar', 'eliminar'];
      },
    });
  }

  public consultar(row: any) {
    this.router.navigate([`/consulta/ver-form-consulta/${row?.name}`]);
  }

  public eliminar(_t48: any) {
    console.debug('Method not implemented.');
  }
 
  public consultarFormulario(row: any) {
 this.router.navigate([`/consulta/consultar-form-consulta/${row?.name}`]);
  }
 
 
  public editar(_t27: any) {
    console.debug('Method not implemented.');
  }
}
