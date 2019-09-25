import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowupDueComponent } from './followup-due.component';

describe('FollowupDueComponent', () => {
  let component: FollowupDueComponent;
  let fixture: ComponentFixture<FollowupDueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FollowupDueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowupDueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
