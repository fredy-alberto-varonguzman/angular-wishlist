import { BehaviorSubject, Subject } from 'rxjs';
import { DestinoViajes }  from './destino-viaje.model';

export class DestinoApiClient {
    destinos:DestinoViajes[] = [];
    current: Subject<DestinoViajes> = new BehaviorSubject<DestinoViajes>(new DestinoViajes('',''));
    add(d:DestinoViajes) {
        this.destinos.push(d);
    }
    getAll(): DestinoViajes[] {
        return this.destinos;
    }
 
    getById(id: String): DestinoViajes {
        return this.destinos.filter(function(d){return d.id === id;})[0];
    }

    elegir(d: DestinoViajes) {
        this.destinos.forEach(function(x){x.setSelected(false)});
        d.setSelected(true);
        this.current.next(d);
    }
    subcriveOnChange(fn: any) {
        this.current.subscribe(fn);
    }

}