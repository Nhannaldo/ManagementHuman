import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupTrainingComponent } from './popup-training.component';

describe('PopupTrainingComponent', () => {
  let component: PopupTrainingComponent;
  let fixture: ComponentFixture<PopupTrainingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupTrainingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
