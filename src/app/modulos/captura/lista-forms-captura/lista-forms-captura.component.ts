import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ListaFormulariosService } from './lista-forms-captura.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lista-forms-captura',
  imports: [
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    FormsModule,
  ],
  templateUrl: './lista-forms-captura.component.html',
  styleUrl: './lista-forms-captura.component.scss',
})
export class ListaFormsCapturaComponent {
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
    console.debug('Method not implemented.');
  }
  
  public verReporte() {
    console.debug('Method not implemented.');
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
    this.router.navigate([`/captura/ver-form-captura/${row?.name}`]);
  }

  public eliminar(_t48: any) {
    console.debug('Method not implemented.');
  }
 
  public consultarFormulario(_t41: any) {

  }
 
  public diligenciar(row: any) {
    this.router.navigate([`/captura/diligenciar-form-captura/${row?.name}`]);
  }
 
  public editar(_t27: any) {
    console.debug('Method not implemented.');
  }
}
