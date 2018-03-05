import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegloginComponent } from './reglogin.component';

describe('RegloginComponent', () => {
  let component: RegloginComponent;
  let fixture: ComponentFixture<RegloginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegloginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
