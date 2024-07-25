import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-popup-certificate-detail',
  templateUrl: './popup-certificate-detail.component.html',
  styleUrls: ['./popup-certificate-detail.component.css'],
})
export class PopupCertificateDetailComponent {
  data: any;
  constructor(
    private _dialog: MatDialogRef<PopupCertificateDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public inputData: any
  ) {
    this.data = inputData;
  }

  closeModal() {
    this._dialog.close();
  }
}
