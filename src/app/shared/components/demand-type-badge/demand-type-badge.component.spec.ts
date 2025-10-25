import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandTypeBadgeComponent } from './demand-type-badge.component';

describe('DemandTypeBadgeComponent', () => {
  let component: DemandTypeBadgeComponent;
  let fixture: ComponentFixture<DemandTypeBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemandTypeBadgeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemandTypeBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
