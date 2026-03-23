import { BehaviorSubject, Subject } from 'rxjs';
import { DestinoViajes }  from './destino-viaje.model';
import { Store } from '@ngrx/store';
import { AppState, ElegidoFavoritoAction, NuevoDestinoViajeAction } from './destinos-viajes-state.model';
import { Injectable } from '@angular/core';

@Injectable()
export class DestinoApiClient {
    destinos:DestinoViajes[] = [];
    current: Subject<DestinoViajes> = new BehaviorSubject<DestinoViajes>(new DestinoViajes('',''));
    private store : Store<AppState>;

    constructor(store: Store<AppState>) {
        this.store = store;
    }   
    add(d:DestinoViajes) {
        this.store.dispatch(new NuevoDestinoViajeAction(d));
    }
    /*
    getAll(): DestinoViajes[] {
        return this.destinos;
    }
 
    getById(id: String): DestinoViajes {
        return this.destinos.filter(function(d){return d.id === id;})[0];
    }
    */
    elegir(d: DestinoViajes) {
        this.store.dispatch(new ElegidoFavoritoAction(d));
    }
    /*
    subcriveOnChange(fn: any) {
        this.current.subscribe(fn);
    }*/

}