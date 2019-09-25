import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadmissionComponent } from './readmission.component';

describe('ReadmissionComponent', () => {
  let component: ReadmissionComponent;
  let fixture: ComponentFixture<ReadmissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadmissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
