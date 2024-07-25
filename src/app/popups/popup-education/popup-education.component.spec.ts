import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupEducationComponent } from './popup-education.component';

describe('PopupEducationComponent', () => {
  let component: PopupEducationComponent;
  let fixture: ComponentFixture<PopupEducationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupEducationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupEducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
