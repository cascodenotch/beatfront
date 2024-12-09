import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetaCancionComponent } from './tarjeta-cancion.component';

describe('TarjetaCancionComponent', () => {
  let component: TarjetaCancionComponent;
  let fixture: ComponentFixture<TarjetaCancionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TarjetaCancionComponent]
    });
    fixture = TestBed.createComponent(TarjetaCancionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
