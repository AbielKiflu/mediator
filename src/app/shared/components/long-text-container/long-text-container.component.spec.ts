import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LongTextContainerComponent } from './long-text-container.component';

describe('LongTextContainerComponent', () => {
  let component: LongTextContainerComponent;
  let fixture: ComponentFixture<LongTextContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LongTextContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LongTextContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
