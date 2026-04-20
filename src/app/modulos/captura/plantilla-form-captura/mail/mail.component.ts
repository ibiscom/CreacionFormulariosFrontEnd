import { Component, Input } from '@angular/core';
import { PlantillaFormCapturaComponent } from '../plantilla-form-captura.component';
import { MailEntity } from '../../../../entidades/forms-captura/mail.entity';
import { MatFormField, MatLabel } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'frm-mail',
  imports: [MatLabel, MatButtonModule, MatFormFieldModule],
  templateUrl: './mail.component.html',
  styleUrl: './mail.component.scss',
})
export class MailComponent {
  @Input() public mailEntity?: MailEntity;
  @Input() public verFormularioCmp?: PlantillaFormCapturaComponent;

  public constructor() {}

  ngOnInit(): void {
    console.debug('Mail:', this.mailEntity);
  }

  enviarMail(): void {
    console.debug('Enviar mail:', this.mailEntity);
  }
}
