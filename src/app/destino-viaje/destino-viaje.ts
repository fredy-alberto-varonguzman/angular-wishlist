import { Component, EventEmitter, HostBinding, input, Input, Output } from '@angular/core';
import { DestinoViajes } from '../destino-viaje.model';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-destino-viaje',
  imports: [CommonModule, RouterLink],
  templateUrl: './destino-viaje.html',
  styleUrl: './destino-viaje.css',
})
export class DestinoViaje {
  @HostBinding('attr.class') cssClass = 'col-md-4';
  @Input() destino: DestinoViajes = new DestinoViajes('', '');
  @Input() position: number = 0;
  @Output() clicked: EventEmitter<DestinoViajes> = new EventEmitter();
  ir() {
    this.clicked.emit(this.destino);
    return false;
  }
}
