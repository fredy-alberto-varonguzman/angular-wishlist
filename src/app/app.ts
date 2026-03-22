import { Component, signal } from '@angular/core';
import { RouterOutlet, Routes, RouterLinkWithHref } from '@angular/router';
import {DestinoViaje} from './destino-viaje/destino-viaje'
import {ListadoDestinos} from './listado-destinos/listado-destinos'
import { DestinoDetalle } from './destino-detalle/destino-detalle';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormDestinoViaje } from './form-destino-viaje/form-destino-viaje';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DestinoViaje, ListadoDestinos, RouterLinkWithHref, FormsModule, ReactiveFormsModule,DestinoDetalle, FormDestinoViaje],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('angular-wishlist');
}
