import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RelevantTweetsComponent } from './relevant-tweets.component';

describe('TweetsComponent', () => {
  let component: RelevantTweetsComponent;
  let fixture: ComponentFixture<RelevantTweetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelevantTweetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelevantTweetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
