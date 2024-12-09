import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidacionLogOutComponent } from './validacion-log-out.component';

describe('ValidacionLogOutComponent', () => {
  let component: ValidacionLogOutComponent;
  let fixture: ComponentFixture<ValidacionLogOutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ValidacionLogOutComponent]
    });
    fixture = TestBed.createComponent(ValidacionLogOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
