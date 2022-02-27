import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientLogsListComponent } from './client-logs-list.component';

describe('ClientLogsListComponent', () => {
  let component: ClientLogsListComponent;
  let fixture: ComponentFixture<ClientLogsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientLogsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientLogsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
