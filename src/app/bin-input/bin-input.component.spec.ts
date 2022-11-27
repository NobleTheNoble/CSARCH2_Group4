import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BinInputComponent } from './bin-input.component';

describe('BinInputComponent', () => {
  let component: BinInputComponent;
  let fixture: ComponentFixture<BinInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BinInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BinInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
