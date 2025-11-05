import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviousInfoDialog } from './previous-info-dialog';

describe('PreviousInfoDialog', () => {
  let component: PreviousInfoDialog;
  let fixture: ComponentFixture<PreviousInfoDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreviousInfoDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviousInfoDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
