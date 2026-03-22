import { Routes } from '@angular/router';
import { ListadoDestinos } from './listado-destinos/listado-destinos';
import { DestinoDetalle } from './destino-detalle/destino-detalle';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: ListadoDestinos },
    {path: 'destino', component: DestinoDetalle }
];
