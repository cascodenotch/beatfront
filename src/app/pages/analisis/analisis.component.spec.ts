import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalisisComponent } from './analisis.component';

describe('AnalisisComponent', () => {
  let component: AnalisisComponent;
  let fixture: ComponentFixture<AnalisisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnalisisComponent]
    });
    fixture = TestBed.createComponent(AnalisisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
