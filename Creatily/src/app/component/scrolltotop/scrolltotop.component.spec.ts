import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrolltoTopComponent } from './scrolltotop.component';

describe('ScrolltoTopComponent', () => {
  let component: ScrolltoTopComponent;
  let fixture: ComponentFixture<ScrolltoTopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScrolltoTopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrolltoTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
