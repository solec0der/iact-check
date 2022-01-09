import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentGroupDetailComponent } from './document-group-detail.component';

describe('DocumentGroupDetailComponent', () => {
  let component: DocumentGroupDetailComponent;
  let fixture: ComponentFixture<DocumentGroupDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentGroupDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentGroupDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
