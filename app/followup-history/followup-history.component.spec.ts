import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowupHistoryComponent } from './followup-history.component';

describe('FollowupHistoryComponent', () => {
  let component: FollowupHistoryComponent;
  let fixture: ComponentFixture<FollowupHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FollowupHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowupHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
