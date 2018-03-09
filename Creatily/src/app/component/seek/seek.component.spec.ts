import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeekComponent } from './seek.component';

describe('SeekComponent', () => {
  let component: SeekComponent;
  let fixture: ComponentFixture<SeekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeekComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
