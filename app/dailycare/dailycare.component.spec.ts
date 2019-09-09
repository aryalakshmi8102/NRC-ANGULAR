import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailycareComponent } from './dailycare.component';

describe('DailycareComponent', () => {
  let component: DailycareComponent;
  let fixture: ComponentFixture<DailycareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailycareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailycareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
