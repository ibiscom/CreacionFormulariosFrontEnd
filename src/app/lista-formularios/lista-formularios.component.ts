import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ListaFormulariosService } from './lista-formularios.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lista-formularios',
  imports: [
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    FormsModule,
  ],
  templateUrl: './lista-formularios.component.html',
  styleUrl: './lista-formularios.component.scss',
})
export class ListaFormulariosComponent {
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
    private listaFormulariosService: ListaFormulariosService,
    private router: Router,
  ) {}

  public mensaje(): string {
    return '';
  }

  public total(): number {
    return 0;
  }

  public pageChanged($event: PageEvent) {
    console.log('Method not implemented.');
  }
  
  public verReporte() {
    console.log('Method not implemented.');
  }
  
  public consultarFormularios() {
    this.listaFormulariosService.getFormularios(this.filtroFormulario).subscribe({
      next: (response) => {
        this.dataSource = response.respuesta || [];
        this.displayedColumns = ['nombre', 'editar', 'diligenciar', 'consultar', 'eliminar'];
      },
      error: (error) => {
        console.error('Error al consultar los formularios:', error);
        this.dataSource = [];
        this.displayedColumns = ['nombre', 'editar', 'diligenciar', 'consultar', 'eliminar'];
      },
    });
  }

  public consultar(row: any) {
    this.router.navigate([`/ver-formulario/${row?.name}`]);
  }

  public eliminar(_t48: any) {
    console.log('Method not implemented.');
  }
 
  public consultarFormulario(_t41: any) {

  }
 
  public diligenciar(_t34: any) {
    console.log('Method not implemented.');
  }
 
  public editar(_t27: any) {
    console.log('Method not implemented.');
  }
}
