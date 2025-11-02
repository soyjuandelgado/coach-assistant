import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmotionsDialog } from './emotions-dialog';

describe('EmotionsDialog', () => {
  let component: EmotionsDialog;
  let fixture: ComponentFixture<EmotionsDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmotionsDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmotionsDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
