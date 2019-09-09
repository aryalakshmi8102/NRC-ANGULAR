import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowupSearchComponent } from './followup-search.component';

describe('FollowupSearchComponent', () => {
  let component: FollowupSearchComponent;
  let fixture: ComponentFixture<FollowupSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FollowupSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowupSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
