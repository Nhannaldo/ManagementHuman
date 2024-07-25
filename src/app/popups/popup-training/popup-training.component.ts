import {
  Component,
  Inject,
  OnInit,
  ViewChild,
  ElementRef,
  ViewEncapsulation,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MasterService } from 'src/Service/master.service';
import { Training } from 'src/model/model';

import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-popup-training',
  templateUrl: './popup-training.component.html',
  styleUrls: ['./popup-training.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class PopupTrainingComponent implements OnInit {
  @ViewChild('dialogContent', { static: false }) dialogContent!: ElementRef;

  // Data Select form
  chucdanh: string[] = [
    'Nhân Viên IT',
    'Kỹ Sư Phần Mềm',
    'Quản Trị Mạng',
    'Nhân Viên Hành Chính',
    'Trưởng Phòng Kinh Doanh',
  ];

  hinhthuctochuc: string[] = ['Trực Tuyến', 'Tại Chỗ'];

  loaidaotao: string[] = ['Đại học', 'Sau đại học', 'Tiến sĩ'];

  ketquadaotao: string[] = ['Xuất Sắc', 'Khá', 'Giỏi'];

  trangthai: string[] = ['Hoàn Thành', 'Dự thảo'];

  //search select
  searchTermChucDanh: string = '';
  filteredChucDanh: string[] = [];

  filterChucDanh(search: string) {
    if (!search) {
      this.filteredChucDanh = this.chucdanh.slice();
    } else {
      const filterValue = search.toLowerCase();
      this.filteredChucDanh = this.chucdanh.filter((option) =>
        option.toLowerCase().includes(filterValue)
      );
    }
  }

  // ràng buộc Date input
  notifyError: string = '';
  dateError = false;

  validateDate(date: string): boolean {
    return /^\d{2}\/\d{2}\/\d{4}$/.test(date);
  }

  onDateChange(value: string) {
    this.dateError = !this.validateDate(value);
  }

  //Khởi tạo và khai báo
  trainingObj: Training = new Training();

  constructor(
    private _dialog: MatDialogRef<PopupTrainingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private masterService: MasterService
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.trainingObj = this.data;

      this.trainingObj.DateStart = new Date(this.data.DateStart);
      this.trainingObj.DateEnd = new Date(this.data.DateEnd);
    }
    this.filteredChucDanh = this.chucdanh.slice();
  }

  //Thao tác
  closeModal() {
    this._dialog.close();
  }

  scrollToBottom(): void {
    try {
      this.dialogContent.nativeElement.scrollTop =
        this.dialogContent.nativeElement.scrollHeight;
    } catch (err) {}
  }

  onSubmit(form: NgForm): void {
    if (form.invalid) {
      this.notifyError = 'Vui lòng kiểm tra lại đầy đủ thông tin!';
      setTimeout(() => {
        this.scrollToBottom();
      }, 0);
      return;
    }

    this.notifyError = '';

    if (this.data) {
      this.masterService.updateTraining(this.trainingObj).subscribe(
        (res) => {
          console.log('Update thành công:', res);
          alert('Cập nhật thành công!!');
          this._dialog.close();
          this.trainingObj = new Training();
        },
        (error) => {
          console.error('Lỗi khi update:', error);
        }
      );
    } else {
      this.masterService.addTraining(this.trainingObj).subscribe(
        (res) => {
          console.log('Thêm mới thành công:', res);
          alert('Thêm mới thành công!!');
          this._dialog.close();
          this.trainingObj = new Training();
        },
        (error) => {
          console.error('Lỗi khi thêm:', error);
        }
      );
    }
  }
}
