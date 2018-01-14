import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalesDelRepartidorComponent } from './totales-del-repartidor.component';

describe('TotalesDelRepartidorComponent', () => {
  let component: TotalesDelRepartidorComponent;
  let fixture: ComponentFixture<TotalesDelRepartidorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalesDelRepartidorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalesDelRepartidorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
