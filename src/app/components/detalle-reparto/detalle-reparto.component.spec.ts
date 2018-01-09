import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleRepartoComponent } from './detalle-reparto.component';

describe('DetalleRepartoComponent', () => {
  let component: DetalleRepartoComponent;
  let fixture: ComponentFixture<DetalleRepartoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleRepartoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleRepartoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
