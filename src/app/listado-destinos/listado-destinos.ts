import { DestinoApiClient } from './../models/destino-api-client.model';
import { Component, inject, OnInit } from '@angular/core';
import { State, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { DestinoViaje } from '../destino-viaje/destino-viaje';
import { CommonModule, AsyncPipe } from '@angular/common';
import { DestinoViajes } from '../models/destino-viaje.model';
import { FormDestinoViaje } from '../form-destino-viaje/form-destino-viaje';
import {
  AppState,
  DestinosViajesState,
  ElegidoFavoritoAction,
  selectAllDestinos,
  selectFavorito,
  EliminarDestinoAction,
  ResetVoteAction
} from '../models/destinos-viajes-state.model';

@Component({
  selector: 'app-listado-destinos',
  imports: [DestinoViaje, CommonModule, AsyncPipe, FormDestinoViaje],
  templateUrl: './listado-destinos.html',
  styleUrl: './listado-destinos.css',
})
export class ListadoDestinos implements OnInit {
  private store = inject(Store<AppState>);

  /*
  destinos$: Observable<DestinoViajes[]> = this.store.select(
    state => state.destinos.items
  );

  favorito$: Observable<DestinoViajes | null> = this.store.select(
    state => state.destinos.favorito
  );
*/ 
  destinos$: Observable<DestinoViajes[]>    = this.store.select(selectAllDestinos);
  favorito$: Observable<DestinoViajes|null> = this.store.select(selectFavorito);
  updates: string[] = [];
  public all: any;

  ngOnInit() {
    // ✅ Escucha cambios del favorito desde el store
    this.favorito$.subscribe((d: DestinoViajes | null) => {
      if (d != null) {
        this.updates.push('Se ha elegido a ' + d.nombre);
      }
    });
    this.store.select(state => state.destinos.items).subscribe(items => {this.all = items;});
  }

  elegido(d: DestinoViajes) {
    this.store.dispatch(new ElegidoFavoritoAction(d));
  }
  eliminar(d: DestinoViajes) {
    console.log('Eliminando destino: ' + d.nombre);
    this.store.dispatch(new EliminarDestinoAction(d));
    this.updates.push('Se ha eliminado a ' + d.nombre);
  }
  resetVotos() {
    this.store.dispatch(new ResetVoteAction());
    this.updates.push('Se han reseteado los votos');
  }
}