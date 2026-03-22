import { Component, OnInit, Output } from '@angular/core';
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
  @Output() onItemAdded: ;
  destinos: DestinoViajes[] = [];

  ngOnInit() {
  }


  guardar(nombre: string, url: string):boolean {
    this.destinos.push(new DestinoViajes(nombre, url));
    console.log(this.destinos);
    return false;
  }


  elegido(d: DestinoViajes) {
    this.destinos.forEach(function (x) { x.setSelected(false); });
    d.setSelected(true);
  }

}
