import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupCertificateDetailComponent } from './popup-certificate-detail.component';

describe('PopupCertificateDetailComponent', () => {
  let component: PopupCertificateDetailComponent;
  let fixture: ComponentFixture<PopupCertificateDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupCertificateDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupCertificateDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
