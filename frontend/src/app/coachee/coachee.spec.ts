import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Coachee } from './coachee';

describe('Coachee', () => {
  let component: Coachee;
  let fixture: ComponentFixture<Coachee>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Coachee]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Coachee);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
