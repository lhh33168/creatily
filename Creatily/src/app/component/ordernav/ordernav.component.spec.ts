import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdernavComponent } from './ordernav.component';

describe('OrdernavComponent', () => {
  let component: OrdernavComponent;
  let fixture: ComponentFixture<OrdernavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdernavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdernavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
