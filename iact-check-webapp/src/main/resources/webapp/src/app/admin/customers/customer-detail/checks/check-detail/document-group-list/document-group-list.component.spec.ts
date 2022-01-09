import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentGroupListComponent } from './document-group-list.component';

describe('DocumentGroupListComponent', () => {
  let component: DocumentGroupListComponent;
  let fixture: ComponentFixture<DocumentGroupListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentGroupListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentGroupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
