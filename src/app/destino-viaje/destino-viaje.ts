import { Component, EventEmitter, HostBinding, inject, input, Input, Output } from '@angular/core';
import { DestinoViajes } from '../models/destino-viaje.model';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState, ElegidoFavoritoAction, VoteDownAction, VoteUpAction } from '../models/destinos-viajes-state.model';

@Component({
  selector: 'app-destino-viaje',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './destino-viaje.html',
  styleUrl: './destino-viaje.css',
})
export class DestinoViaje {
  @HostBinding('attr.class') cssClass = 'col-md-4';
  @Input() destino: DestinoViajes = new DestinoViajes('', '');
  @Input("idx") position: number = 0;
  @Input() esFavorito: boolean = false;
  @Output() clicked: EventEmitter<DestinoViajes> = new EventEmitter();

  private store = inject(Store<AppState>);   
  private router = inject(Router);   
  ir() {
    this.store.dispatch(new ElegidoFavoritoAction(this.destino));
    this.clicked.emit(this.destino);
    //this.router.navigate(['/destino']);
    return false;
  }

  voteUp() {
    this.store.dispatch(new VoteUpAction(this.destino));
    return false;
  }

  voteDown() {
    this.store.dispatch(new VoteDownAction(this.destino));
    return false;
  }
}
