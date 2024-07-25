import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-popup-training-detail',
  templateUrl: './popup-training-detail.component.html',
  styleUrls: ['./popup-training-detail.component.css'],
})
export class PopupTrainingDetailComponent {
  data: any;
  constructor(
    private _dialog: MatDialogRef<PopupTrainingDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public inputData: any
  ) {
    this.data = inputData;
  }

  closeModal() {
    this._dialog.close();
  }
}
