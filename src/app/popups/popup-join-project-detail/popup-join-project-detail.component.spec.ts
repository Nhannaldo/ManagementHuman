import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupJoinProjectDetailComponent } from './popup-join-project-detail.component';

describe('PopupJoinProjectDetailComponent', () => {
  let component: PopupJoinProjectDetailComponent;
  let fixture: ComponentFixture<PopupJoinProjectDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupJoinProjectDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupJoinProjectDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
