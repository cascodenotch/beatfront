import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidacionGuardarComponent } from './validacion-guardar.component';

describe('ValidacionGuardarComponent', () => {
  let component: ValidacionGuardarComponent;
  let fixture: ComponentFixture<ValidacionGuardarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ValidacionGuardarComponent]
    });
    fixture = TestBed.createComponent(ValidacionGuardarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
