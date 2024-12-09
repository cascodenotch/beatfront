import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetaCancionSetComponent } from './tarjeta-cancion-set.component';

describe('TarjetaCancionSetComponent', () => {
  let component: TarjetaCancionSetComponent;
  let fixture: ComponentFixture<TarjetaCancionSetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TarjetaCancionSetComponent]
    });
    fixture = TestBed.createComponent(TarjetaCancionSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
