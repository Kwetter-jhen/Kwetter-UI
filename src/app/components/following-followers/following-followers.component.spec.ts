import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowingFollowersComponent } from './following-followers.component';

describe('FollowingFollowersComponent', () => {
  let component: FollowingFollowersComponent;
  let fixture: ComponentFixture<FollowingFollowersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FollowingFollowersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowingFollowersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
