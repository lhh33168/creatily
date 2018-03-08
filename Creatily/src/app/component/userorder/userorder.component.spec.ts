import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserorderComponent } from './userorder.component';

describe('UserorderComponent', () => {
  let component: UserorderComponent;
  let fixture: ComponentFixture<UserorderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserorderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
