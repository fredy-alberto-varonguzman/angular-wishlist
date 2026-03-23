import { Component, inject, OnInit, output, PLATFORM_ID } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { DestinoViaje } from '../destino-viaje/destino-viaje';
import { DestinoViajes } from '../models/destino-viaje.model';
import { NgIf, NgForOf, isPlatformBrowser } from '@angular/common';
import { fromEvent, Observable, of } from 'rxjs';
import { map, filter, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { ajax, AjaxResponse } from 'rxjs/ajax';
import { DestinosViajesState, NuevoDestinoViajeAction } from '../models/destinos-viajes-state.model';
import { Store } from '@ngrx/store';
const DESTINOS_DISPONIBLES: string[] = [
  'Barcelona', 'Buenos Aires', 'Bogotá', 'Berlín', 'Bangkok',
  'Madrid', 'Miami', 'México DF', 'Medellín',
  'París', 'Praga', 'Porto',
  'Roma', 'Río de Janeiro',
  'Londres', 'Lisboa',
  'Nueva York', 'Ámsterdam', 'Tokio', 'Dubái'
];
@Component({
  selector: 'app-form-destino-viaje',
  imports: [ReactiveFormsModule, NgIf, NgForOf],
  templateUrl: './form-destino-viaje.html',
  styleUrl: './form-destino-viaje.css',
})
export class FormDestinoViaje implements OnInit {
  private fb = inject(FormBuilder);
  minLongitud = 3
  onFormSubmit = output<DestinoViajes>();
  private platformId = inject(PLATFORM_ID);
  private store = inject(Store<DestinosViajesState>); 
  searchResult: string[] = [];
  form = this.fb.group({
    nombre: ['', Validators.compose([Validators.required, this.nombreValidator.bind(this), this.nombreValidatorParametizable(this.minLongitud)])],
    url: ['']
  });

  ngOnInit(): void {
    this.form.valueChanges.subscribe((form: any) => {
      console.log('cambios en el formulario', form);
    });

    if (isPlatformBrowser(this.platformId)) {
      const elemnombre = document.getElementById('nombre') as HTMLInputElement;
      fromEvent<InputEvent>(elemnombre, 'input').pipe(
        map((e: InputEvent) => (e.target as HTMLInputElement).value),
        filter(text => text.length >= 4),
        debounceTime(200),
        distinctUntilChanged(),
        switchMap((text): Observable<string[]> => {
          const textLower = text.toLowerCase();
          const resultado = DESTINOS_DISPONIBLES.filter(d => 
            d.toLowerCase().includes(textLower)
          );
          return of (resultado);
        })
      ).subscribe((resultados: string[]) => {
        this.searchResult = resultados;
      });
      /*
          fromEvent<InputEvent>(elemnombre, 'input').pipe(
            map((e: InputEvent) => (e.target as HTMLInputElement).value),
            filter(text => text.length > 2),
            debounceTime(200),
            distinctUntilChanged(),
            switchMap(() => ajax<string[]>('datos.json'))
          ).subscribe(ajaxResponse => {
            console.log(ajaxResponse);
            this.searchResult = ajaxResponse.response;
          });
          */
    }

  }

  guardar() {
    if (this.form.valid) {
      const { nombre, url } = this.form.value;
      const destino = new DestinoViajes(nombre!, url!);
      this.store.dispatch(new NuevoDestinoViajeAction(destino));
      this.form.reset({nombre: '', url: ''});
      this.searchResult = [];
    }
  }

  nombreValidator(control: FormControl): { [s: string]: boolean } {
    if (!control.value) return {};
    let l = control.value.toString().trim().length;
    if (l > 0 && l < this.minLongitud) {
      return { 'invalidNombre': true };
    }
    return {};
  }

  nombreValidatorParametizable(minLong: number): ValidatorFn {
    return (control: AbstractControl): { [s: string]: boolean } => {
      if (!control.value) return {};
      let l = control.value.toString().trim().length;
      if (l > 0 && l < minLong) {
        return { 'minLongNombre': true };
      }
      return {};
    };
  }
}
