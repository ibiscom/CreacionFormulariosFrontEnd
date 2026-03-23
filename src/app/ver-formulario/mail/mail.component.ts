import { Component, Input } from '@angular/core';
import { VerFormularioComponent } from '../ver-formulario.component';
import { MailEntity } from '../../entities/ver-formulario/mail.entity';
import { MatFormField, MatLabel } from "@angular/material/input";
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'frm-mail',
  imports: [MatLabel, MatButtonModule, MatFormFieldModule ],
  templateUrl: './mail.component.html',
  styleUrl: './mail.component.scss',
})
export class MailComponent {
  @Input() public mailEntity?: MailEntity;
  @Input() public verFormularioCmp?: VerFormularioComponent;

  public constructor() {}

  ngOnInit(): void {
    console.log('Mail:', this.mailEntity);
  }
}
