import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmaWelcomeComponent } from './pma-welcome.component';

describe('PmaWelcomeComponent', () => {
  let component: PmaWelcomeComponent;
  let fixture: ComponentFixture<PmaWelcomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PmaWelcomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PmaWelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
