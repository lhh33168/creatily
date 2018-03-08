import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersetComponent } from './userset.component';

describe('UsersetComponent', () => {
  let component: UsersetComponent;
  let fixture: ComponentFixture<UsersetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
