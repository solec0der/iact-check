import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketplaceConfigComponent } from './marketplace-config.component';

describe('MarketplaceConfigComponent', () => {
  let component: MarketplaceConfigComponent;
  let fixture: ComponentFixture<MarketplaceConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarketplaceConfigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketplaceConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
