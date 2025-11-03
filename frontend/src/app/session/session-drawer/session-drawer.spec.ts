import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionDrawer } from './session-drawer';

describe('SessionDrawer', () => {
  let component: SessionDrawer;
  let fixture: ComponentFixture<SessionDrawer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessionDrawer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessionDrawer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
