import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-popup-join-project-detail',
  templateUrl: './popup-join-project-detail.component.html',
  styleUrls: ['./popup-join-project-detail.component.css'],
})
export class PopupJoinProjectDetailComponent {
  data: any;
  constructor(
    private _dialog: MatDialogRef<PopupJoinProjectDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public inputData: any
  ) {
    this.data = inputData;
  }

  closeModal() {
    this._dialog.close();
  }
}
