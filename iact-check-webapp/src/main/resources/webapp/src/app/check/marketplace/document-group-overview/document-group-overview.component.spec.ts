import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentGroupOverviewComponent } from './document-group-overview.component';

describe('DocumentGroupOverviewComponent', () => {
  let component: DocumentGroupOverviewComponent;
  let fixture: ComponentFixture<DocumentGroupOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentGroupOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentGroupOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
