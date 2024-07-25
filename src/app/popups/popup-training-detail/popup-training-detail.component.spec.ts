import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupTrainingDetailComponent } from './popup-training-detail.component';

describe('PopupTrainingDetailComponent', () => {
  let component: PopupTrainingDetailComponent;
  let fixture: ComponentFixture<PopupTrainingDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupTrainingDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupTrainingDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
