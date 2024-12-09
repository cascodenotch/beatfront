import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisSetsComponent } from './mis-sets.component';

describe('MisSetsComponent', () => {
  let component: MisSetsComponent;
  let fixture: ComponentFixture<MisSetsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MisSetsComponent]
    });
    fixture = TestBed.createComponent(MisSetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
