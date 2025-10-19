import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandStatusChipComponent } from './demand-status-chip.component';

describe('DemandStatusChipComponent', () => {
  let component: DemandStatusChipComponent;
  let fixture: ComponentFixture<DemandStatusChipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemandStatusChipComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemandStatusChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
