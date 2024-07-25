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
import { Education } from 'src/model/model';

import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-popup-education',
  templateUrl: './popup-education.component.html',
  styleUrls: ['./popup-education.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class PopupEducationComponent implements OnInit {
  @ViewChild('dialogContent', { static: false }) dialogContent!: ElementRef;

  // Data Select form
  trinhdodaotao: string[] = ['Cử nhân', 'Thạc sĩ', 'Tiến sĩ'];

  cosodaotao: string[] = [
    'Đại học Quốc gia TP Hồ Chí Minh',
    'Đại học Bách khoa TP.HCM',
    'Đại học Đà Nẵng',
    'Đại học Bách khoa Hà Nội',
    'Đại học Công nghệ TP.HCM',
    'Đại học Quốc gia Hà Nội',
    'Đại học Sư phạm Kỹ thuật TP.HCM',
    'Đại học Huế',
    'Đại học Cần Thơ',
    'Đại học Quốc gia TP.HCM',
  ];

  hinhthucdaotao: string[] = ['Chính quy', 'Liên thông', 'Sau đại học'];

  loaidaotao: string[] = ['Đại học', 'Sau đại học', 'Tiến sĩ'];

  chuyennganhdaotao: string[] = [
    'Công nghệ thông tin',
    'Khoa học máy tính',
    'Mạng máy tính',
    'Kỹ thuật phần mềm',
    'Công nghệ phần mềm',
    'Trí tuệ nhân tạo',
  ];

  nganhdaotao: string[] = [
    'Kỹ thuật phần mềm',
    'Hệ thống thông tin',
    'Kỹ thuật máy tính',
    'Công nghệ thông tin',
    'Trí tuệ nhân tạo',
    'Khoa học máy tính',
  ];

  xeploaitotnghiep: string[] = ['Giỏi', 'Khá', 'Xuất sắc'];

  danhhieudaotao: string[] = ['Giỏi', 'Xuất sắc', 'Tiến sĩ'];

  //select search
  searchTermCoSoDaoTao: string = '';
  searchTermNganhDaoTao: string = '';
  searchTermChuyenNganhDaoTao: string = '';

  filteredCoSoDaoTao: string[] = [];
  filteredNganhDaoTao: string[] = [];
  filteredChuyenNganhDaoTao: string[] = [];

  filterCoSoDaoTao(search: string) {
    if (!search) {
      this.filteredCoSoDaoTao = this.cosodaotao.slice();
    } else {
      const filterValue = search.toLowerCase();
      this.filteredCoSoDaoTao = this.cosodaotao.filter((option) =>
        option.toLowerCase().includes(filterValue)
      );
    }
  }

  filterNganhDaoTao(search: string) {
    if (!search) {
      this.filteredNganhDaoTao = this.nganhdaotao.slice();
    } else {
      const filterValue = search.toLowerCase();
      this.filteredNganhDaoTao = this.nganhdaotao.filter((option) =>
        option.toLowerCase().includes(filterValue)
      );
    }
  }

  filterChuyenNganhDaoTao(search: string) {
    if (!search) {
      this.filteredChuyenNganhDaoTao = this.chuyennganhdaotao.slice();
    } else {
      const filterValue = search.toLowerCase();
      this.filteredChuyenNganhDaoTao = this.chuyennganhdaotao.filter((option) =>
        option.toLowerCase().includes(filterValue)
      );
    }
  }

  // Ràng buộc Date input

  notifyError: string = '';
  dateError = false;

  validateDate(date: string): boolean {
    return /^\d{2}\/\d{2}\/\d{4}$/.test(date);
  }

  onDateChange(value: string) {
    this.dateError = !this.validateDate(value);
  }

  // Khởi tạo và khai báo
  educationObj: Education = new Education();

  constructor(
    private _dialog: MatDialogRef<PopupEducationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private masterService: MasterService
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.educationObj = this.data;

      this.educationObj.DateStart = new Date(this.data.DateStart);
      this.educationObj.DateEnd = new Date(this.data.DateEnd);
    }
    console.log(typeof this.educationObj.DateStart);
    this.filteredCoSoDaoTao = this.cosodaotao.slice();
    this.filteredNganhDaoTao = this.nganhdaotao.slice();
    this.filteredChuyenNganhDaoTao = this.chuyennganhdaotao.slice();
  }

  filename: string = '';

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.filename = file.name;
      this.educationObj.File = file.name;
    }
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
      this.masterService.updateEducation(this.educationObj).subscribe(
        (res) => {
          console.log('Update thành công:', res);
          alert('Cập nhật thành công!!');
          this._dialog.close();
          this.educationObj = new Education();
        },
        (error) => {
          console.error('Lỗi khi update:', error);
        }
      );
    } else {
      this.masterService.addEducation(this.educationObj).subscribe(
        (res) => {
          console.log('Thêm mới thành công:', res);
          alert('Thêm mới thành công!!');
          this._dialog.close();
          this.educationObj = new Education();
        },
        (error) => {
          console.error('Lỗi khi thêm:', error);
        }
      );
    }
  }
}
