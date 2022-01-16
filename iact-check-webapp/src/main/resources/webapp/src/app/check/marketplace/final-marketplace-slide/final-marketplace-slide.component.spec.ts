import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalMarketplaceSlideComponent } from './final-marketplace-slide.component';

describe('FinalMarketplaceSlideComponent', () => {
  let component: FinalMarketplaceSlideComponent;
  let fixture: ComponentFixture<FinalMarketplaceSlideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinalMarketplaceSlideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalMarketplaceSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
