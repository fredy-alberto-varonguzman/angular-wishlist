import { DestinoApiClient } from './../destino-api-client.model';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DestinoViaje } from "../destino-viaje/destino-viaje";
import { CommonModule } from '@angular/common';
import { DestinoViajes } from '../destino-viaje.model';
import { FormDestinoViaje } from "../form-destino-viaje/form-destino-viaje";
@Component({
  selector: 'app-listado-destinos',
  imports: [DestinoViaje, CommonModule, FormDestinoViaje],
  templateUrl: './listado-destinos.html',
  styleUrl: './listado-destinos.css',
})
export class ListadoDestinos implements OnInit {
  @Output() onItemAdded: EventEmitter<DestinoViajes> = new EventEmitter();
  //destinos: DestinoViajes[] = [];
  public DestinoApiClient: DestinoApiClient = new DestinoApiClient();
  updates: String[] = [];
  ngOnInit() {
    this.DestinoApiClient.subcriveOnChange((d: DestinoViajes) => {
      if (d != null) {
        this.updates.push('Se ha elegido a ' + d.nombre);
      }
    });
  }


  agregado(destino: DestinoViajes): void {
    this.DestinoApiClient.add(destino)
    this.onItemAdded.emit(destino);
    
  }


  elegido(d: DestinoViajes) {
    this.DestinoApiClient.elegir(d);  
  }

}
