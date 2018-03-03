import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BootpageComponent } from './bootpage.component';

describe('BootpageComponent', () => {
  let component: BootpageComponent;
  let fixture: ComponentFixture<BootpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BootpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BootpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
