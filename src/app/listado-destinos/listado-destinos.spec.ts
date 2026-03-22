import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoDestinos } from './listado-destinos';

describe('ListadoDestinos', () => {
  let component: ListadoDestinos;
  let fixture: ComponentFixture<ListadoDestinos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoDestinos],
    }).compileComponents();

    fixture = TestBed.createComponent(ListadoDestinos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
