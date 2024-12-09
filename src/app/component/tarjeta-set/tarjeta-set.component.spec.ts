import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetaSetComponent } from './tarjeta-set.component';

describe('TarjetaSetComponent', () => {
  let component: TarjetaSetComponent;
  let fixture: ComponentFixture<TarjetaSetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TarjetaSetComponent]
    });
    fixture = TestBed.createComponent(TarjetaSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
