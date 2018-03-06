import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetbackComponent } from './getback.component';

describe('GetbackComponent', () => {
  let component: GetbackComponent;
  let fixture: ComponentFixture<GetbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
