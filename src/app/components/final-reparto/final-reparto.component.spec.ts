import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalRepartoComponent } from './final-reparto.component';

describe('FinalRepartoComponent', () => {
  let component: FinalRepartoComponent;
  let fixture: ComponentFixture<FinalRepartoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinalRepartoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalRepartoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
