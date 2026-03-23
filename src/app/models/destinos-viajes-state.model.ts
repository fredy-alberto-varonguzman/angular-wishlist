import { inject, Injectable } from '@angular/core';
import { Action, createFeatureSelector, createSelector } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { RouterReducerState } from '@ngrx/router-store';
import { map } from 'rxjs/operators';
import { DestinoViajes } from './destino-viaje.model';
import { DestinoViaje } from '../destino-viaje/destino-viaje';

// Estado
export interface DestinosViajesState {
    items: DestinoViajes[];
    loading: boolean;
    favorito: DestinoViajes | null;
}

// Estado global de la aplicación
export interface AppState {
    destinos: DestinosViajesState;
    router: RouterReducerState;
}

export const initializeDestinosViajesState = function () {
    return {
        items: [],
        loading: false,
        favorito: null
    }
}

// Acciones
export enum DestinosViajesActionTypes {
    NUEVO_DESTINO_VIAJE = '[Destinos Viajes] Nuevo',
    ELEGIDO_FAVORITO = '[Destinos Viajes] Favorito',
    ELIMINAR_DESTINO = '[Destinos Viajes] Eliminar',
    VOTE_UP = '[Destinos Viajes] Vote Up',
    VOTE_DOWN = '[Destinos Viajes] Vote Down',
    RESET_VOTES = '[Destinos Viajes] Reset Votes'
}

export class EliminarDestinoAction implements Action {
    type = DestinosViajesActionTypes.ELIMINAR_DESTINO;
    constructor(public destino: DestinoViajes) { }
}

export class NuevoDestinoViajeAction implements Action {
    type = DestinosViajesActionTypes.NUEVO_DESTINO_VIAJE;
    constructor(public destino: DestinoViajes) { }
}

export class ElegidoFavoritoAction implements Action {
    type = DestinosViajesActionTypes.ELEGIDO_FAVORITO;
    constructor(public destino: DestinoViajes) { }
}

export class VoteUpAction implements Action {
    type = DestinosViajesActionTypes.VOTE_UP;
    constructor(public destino: DestinoViajes) { }
}

export class VoteDownAction implements Action {
    type = DestinosViajesActionTypes.VOTE_DOWN;
    constructor(public destino: DestinoViajes) { }
}

export class ResetVoteAction implements Action {
    type = DestinosViajesActionTypes.RESET_VOTES;
}
export type DestinosViajesActions = NuevoDestinoViajeAction | ElegidoFavoritoAction | EliminarDestinoAction | VoteUpAction | VoteDownAction;

// Reducer 
export function reducerDestinosViajes(
    state: DestinosViajesState | undefined = initializeDestinosViajesState(),
    action: Action
): DestinosViajesState {
    switch (action.type) {
        case DestinosViajesActionTypes.NUEVO_DESTINO_VIAJE:
            return {
                ...state,
                items: [...state.items, (action as NuevoDestinoViajeAction).destino]
            };
        case DestinosViajesActionTypes.ELIMINAR_DESTINO: {
            const destinoAEliminar = (action as EliminarDestinoAction).destino;
            return {
                ...state,
                items: state.items.filter(
                    item => item.nombre !== destinoAEliminar.nombre
                ),
                favorito: state.favorito?.nombre === destinoAEliminar.nombre
                    ? null
                    : state.favorito
            };
        }
        case DestinosViajesActionTypes.ELEGIDO_FAVORITO: {
            const fav = (action as ElegidoFavoritoAction).destino;
            const nuevosItems = state!.items.map(item => {
                const nuevo = new DestinoViajes(item.nombre, item.imagenUrl);
                nuevo.setSelected(item.nombre === fav.nombre);
                return nuevo;
            });
            const nuevoFav = nuevosItems.find(i => i.nombre === fav.nombre) ?? null;
            return {
                ...state!,
                items: nuevosItems,
                favorito: nuevoFav
            };
        }

        case DestinosViajesActionTypes.VOTE_UP: {
            const d = Object.assign(new DestinoViajes('', ''), (action as VoteUpAction).destino);
            d.voteUp();
            const nuevosItems = state.items.map(item => item.nombre === d.nombre ? d : item);
            return { ...state, items: nuevosItems }
        }

        case DestinosViajesActionTypes.VOTE_DOWN: {
            const d = Object.assign(new DestinoViajes('', ''), (action as VoteDownAction).destino);
            d.voteDown();
            const nuevosItems = state.items.map(item => item.nombre === d.nombre ? d : item);
            return { ...state, items: nuevosItems }
        }
        case DestinosViajesActionTypes.RESET_VOTES: {
        // Crea nuevas instancias con votes = 0 — inmutabilidad
        const itemsReset = state.items.map(item => {
            const nuevo = Object.assign(new DestinoViajes('', ''), item);
            nuevo.votes = 0;
            return nuevo;
        });
        return { ...state, items: itemsReset };
        }
    }
    return state;
}

export const selectDestinosState = createFeatureSelector<DestinosViajesState>('destinos');

export const selectAllDestinos = createSelector(
    selectDestinosState,
    state => state.items
);

export const selectFavorito = createSelector(
    selectDestinosState,
    state => state.favorito
);

//Effects
@Injectable()
export class DestinosViajesEffects {

    private actions$ = inject(Actions);
    nuevoAgregado$ = createEffect(() => this.actions$.pipe(
        ofType(DestinosViajesActionTypes.NUEVO_DESTINO_VIAJE),
        map((action: NuevoDestinoViajeAction) => {
            console.log('Agregado a favoritos: ' + action.destino.nombre);
            return new ElegidoFavoritoAction(action.destino);
        })
    ))


}