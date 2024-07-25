import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupCertificateComponent } from './popup-certificate.component';

describe('PopupCertificateComponent', () => {
  let component: PopupCertificateComponent;
  let fixture: ComponentFixture<PopupCertificateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupCertificateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
