import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupJoinProjectComponent } from './popup-join-project.component';

describe('PopupJoinProjectComponent', () => {
  let component: PopupJoinProjectComponent;
  let fixture: ComponentFixture<PopupJoinProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupJoinProjectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupJoinProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
