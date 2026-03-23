import { ApplicationConfig, isDevMode, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { provideStore } from '@ngrx/store'
import {provideEffects } from '@ngrx/effects'
import { reducerDestinosViajes, DestinosViajesEffects } from './models/destinos-viajes-state.model'
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import { provideStoreDevtools } from '@ngrx/store-devtools';  

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideStore({
      destinos: reducerDestinosViajes,
      router: routerReducer            // router en el store
    }),
    provideEffects([DestinosViajesEffects]),
    provideRouterStore(),               // sincroniza router con store
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),            // solo lectura en producción
      autoPause: true
    })
  ]
};
