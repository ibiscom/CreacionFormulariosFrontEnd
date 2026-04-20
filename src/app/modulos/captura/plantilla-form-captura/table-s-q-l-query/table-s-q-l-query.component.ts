import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PlantillaFormCapturaComponent } from '../plantilla-form-captura.component';
import { TableSQLQueryEntity } from '../../../../entidades/forms-captura/table-s-q-l-query.entity';

@Component({
  selector: 'frm-table-s-q-l-query',
  imports: [MatInputModule, MatFormFieldModule, FormsModule],
  templateUrl: './table-s-q-l-query.component.html',
  styleUrl: './table-s-q-l-query.component.scss',
})
export class TableSQLQueryComponent {
  @Input() public tableSQLQueryEntity?: TableSQLQueryEntity;
  @Input() public verFormularioCmp?: PlantillaFormCapturaComponent;
}
