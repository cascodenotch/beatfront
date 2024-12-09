import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidacionEliminarComponent } from './validacion-eliminar.component';

describe('ValidacionEliminarComponent', () => {
  let component: ValidacionEliminarComponent;
  let fixture: ComponentFixture<ValidacionEliminarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ValidacionEliminarComponent]
    });
    fixture = TestBed.createComponent(ValidacionEliminarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
