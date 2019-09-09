import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InpatientCareComponent } from './inpatient-care.component';

describe('InpatientCareComponent', () => {
  let component: InpatientCareComponent;
  let fixture: ComponentFixture<InpatientCareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InpatientCareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InpatientCareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
