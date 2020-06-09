import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueComposerComponent } from './issue-composer';

describe('IssueComposerComponent', () => {
  let component: IssueComposerComponent;
  let fixture: ComponentFixture<IssueComposerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IssueComposerComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueComposerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
