import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleEdificioComponent } from './detalle-edificio.component';

describe('DetalleEdificioComponent', () => {
  let component: DetalleEdificioComponent;
  let fixture: ComponentFixture<DetalleEdificioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleEdificioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleEdificioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
