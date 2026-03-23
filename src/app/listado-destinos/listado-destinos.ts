import { DestinoApiClient } from './../models/destino-api-client.model';
import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
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
  selectFavorito
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

  ngOnInit() {
    // ✅ Escucha cambios del favorito desde el store
    this.favorito$.subscribe((d: DestinoViajes | null) => {
      if (d != null) {
        this.updates.push('Se ha elegido a ' + d.nombre);
      }
    });
  }

  elegido(d: DestinoViajes) {
    this.store.dispatch(new ElegidoFavoritoAction(d));
  }
  eliminar(d: DestinoViajes) {
    console.log('Eliminando destino: ' + d.nombre);
    this.store.dispatch(new ElegidoFavoritoAction(d));
    this.updates.push('Se ha eliminado a ' + d.nombre);
  }
}