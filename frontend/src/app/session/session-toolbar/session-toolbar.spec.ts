import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionToolbar } from './session-toolbar';

describe('SessionToolbar', () => {
  let component: SessionToolbar;
  let fixture: ComponentFixture<SessionToolbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessionToolbar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessionToolbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
