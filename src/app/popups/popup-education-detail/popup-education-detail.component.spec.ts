import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupEducationDetailComponent } from './popup-education-detail.component';

describe('PopupEducationDetailComponent', () => {
  let component: PopupEducationDetailComponent;
  let fixture: ComponentFixture<PopupEducationDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupEducationDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupEducationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
