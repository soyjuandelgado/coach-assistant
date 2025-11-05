import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertData } from './insert-data';

describe('InsertData', () => {
  let component: InsertData;
  let fixture: ComponentFixture<InsertData>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsertData]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsertData);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
