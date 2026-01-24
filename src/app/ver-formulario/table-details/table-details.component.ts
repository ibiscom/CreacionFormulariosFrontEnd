import { Component, Input } from '@angular/core';
import { TableDetailsEntity } from '../../entities/ver-formulario/table-details.entity';
import { VerFormularioComponent } from '../ver-formulario.component';
import { KeyValue, KeyValuePipe } from '@angular/common';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'frm-table-details',
  imports: [KeyValuePipe, MatInputModule],
  templateUrl: './table-details.component.html',
  styleUrl: './table-details.component.scss',
})
export class TableDetailsComponent {
  @Input() public tableDetailsEntity?: TableDetailsEntity;
  @Input() public verFormularioCmp?: VerFormularioComponent;

  public rowsPerPage: number = 5;

  public constructor() {
  }

  ngOnInit(): void {
    this.getGridColumns();
    console.log('Table Details:', this.tableDetailsEntity);
    
  }

  public getGridColumns(): string {
    if(this.tableDetailsEntity && this.tableDetailsEntity.nombresOrganizados) {
      let colCount:number = 0;
      // Se cuenta las columnas que van llegando para colocar el estilo para cada columna
      colCount += this.tableDetailsEntity.nombresOrganizados['string'].length + 1;
      return Array(colCount).fill('1fr').join(' ');
    }
    return '1fr 1fr'; //  se generan minimo 2 columnas
  }

  public addRow() : void {
    throw new Error('Method not implemented.');
  }

  public search() : void {
    throw new Error('Method not implemented.');
  }

  public deleteRow(_t23: { valores: string[]; }) : void {
    throw new Error('Method not implemented.');   
  }

  public editRow(_t23: { valores: string[]; }) : void {
    throw new Error('Method not implemented.');
  }

  // Conserva el orden de las columnas tal como llega del backend
  public keepOrder = (_a: KeyValue<string, any>, _b: KeyValue<string, any>): number => 0;
}
