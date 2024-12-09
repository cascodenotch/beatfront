import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarSetComponent } from './editar-set.component';

describe('EditarSetComponent', () => {
  let component: EditarSetComponent;
  let fixture: ComponentFixture<EditarSetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarSetComponent]
    });
    fixture = TestBed.createComponent(EditarSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
