import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientLogsDetailComponent } from './client-logs-detail.component';

describe('ClientLogsDetailComponent', () => {
  let component: ClientLogsDetailComponent;
  let fixture: ComponentFixture<ClientLogsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientLogsDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientLogsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
