import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterpwdComponent } from './registerpwd.component';

describe('RegisterpwdComponent', () => {
  let component: RegisterpwdComponent;
  let fixture: ComponentFixture<RegisterpwdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterpwdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterpwdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
