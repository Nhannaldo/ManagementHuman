import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-popup-education-detail',
  templateUrl: './popup-education-detail.component.html',
  styleUrls: ['./popup-education-detail.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class PopupEducationDetailComponent {
  data: any;
  constructor(
    private _dialog: MatDialogRef<PopupEducationDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public inputData: any
  ) {
    this.data = inputData;
  }

  closeModal() {
    this._dialog.close();
  }
}
