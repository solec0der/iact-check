import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentSearchDialogComponent } from './document-search-dialog.component';

describe('DocumentSearchDialogComponent', () => {
  let component: DocumentSearchDialogComponent;
  let fixture: ComponentFixture<DocumentSearchDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentSearchDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentSearchDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
