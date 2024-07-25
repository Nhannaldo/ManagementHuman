import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MasterService } from 'src/Service/master.service';
import { JoinProject } from 'src/model/model';

@Component({
  selector: 'app-popup-join-project',
  templateUrl: './popup-join-project.component.html',
  styleUrls: ['./popup-join-project.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class PopupJoinProjectComponent implements OnInit {
  //Khởi tạo, khai báo
  joinprojectObj: JoinProject = new JoinProject();
  notifyError: string = '';
  dateError = false;

  constructor(
    private _dialog: MatDialogRef<PopupJoinProjectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private masterService: MasterService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.joinprojectObj = { ...this.data };
      console.log(this.joinprojectObj.DateStart);

      this.joinprojectObj.DateStart = new Date(this.data.DateStart);
      this.joinprojectObj.DateEnd = new Date(this.data.DateEnd);
    }
  }

  // Ràng buộc Date input
  validateDate(date: string): boolean {
    return /^\d{2}\/\d{2}\/\d{4}$/.test(date);
  }

  onDateChange(value: string) {
    this.dateError = !this.validateDate(value);
    console.log(this.dateError);
  }

  //Thao tác
  closeModal() {
    this._dialog.close();
  }

  onSubmit(form: NgForm): void {
    if (form.invalid) {
      this.notifyError = 'Vui lòng kiểm tra lại đầy đủ thông tin!';
      return;
    }

    this.notifyError = '';
    console.log('Form Submitted', this.joinprojectObj);

    if (this.data) {
      this.masterService.updateJoinProject(this.joinprojectObj).subscribe(
        (res) => {
          console.log('Update thành công:', res);
          alert('Cập nhật thành công!!');
          this._dialog.close();
          this.joinprojectObj = new JoinProject();
        },
        (error) => {
          console.error('Lỗi khi update:', error);
        }
      );
    } else {
      this.masterService.addJoinProject(this.joinprojectObj).subscribe(
        (res) => {
          console.log('Thêm mới thành công:', res);
          alert('Thêm mới thành công!!');
          this._dialog.close();
          this.joinprojectObj = new JoinProject();
        },
        (error) => {
          console.error('Lỗi khi thêm:', error);
        }
      );
    }
  }
}
