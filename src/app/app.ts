import { Component, signal } from '@angular/core';
import { RouterOutlet, Routes, RouterLinkWithHref } from '@angular/router';
import {DestinoViaje} from './destino-viaje/destino-viaje'
import {ListadoDestinos} from './listado-destinos/listado-destinos'
import { DestinoDetalle } from './destino-detalle/destino-detalle';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormDestinoViaje } from './form-destino-viaje/form-destino-viaje';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DestinoViaje, ListadoDestinos, RouterLinkWithHref, FormsModule, ReactiveFormsModule,DestinoDetalle, FormDestinoViaje, AsyncPipe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('angular-wishlist');

  time = new Observable(observer => {
    setInterval(() => observer.next(new Date().toString()), 1000);
  });
  destinoAgregado(d: DestinoViaje) {

  }
}
