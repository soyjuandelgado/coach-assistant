import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSessionDialog } from './new-session-dialog';

describe('NewSessionDialog', () => {
  let component: NewSessionDialog;
  let fixture: ComponentFixture<NewSessionDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewSessionDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewSessionDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
