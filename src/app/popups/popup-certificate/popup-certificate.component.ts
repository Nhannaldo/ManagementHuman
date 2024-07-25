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
import { Certificate } from 'src/model/model';

import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-popup-certificate',
  templateUrl: './popup-certificate.component.html',
  styleUrls: ['./popup-certificate.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class PopupCertificateComponent implements OnInit {
  @ViewChild('dialogContent', { static: false }) dialogContent!: ElementRef;

  // Data Select form
  loaichungchi: string[] = ['Chứng Chỉ', 'Bằng', 'Ngôn Ngữ'];
  linhvucchungchi: string[] = [
    'Công Nghệ Thông Tin',
    'Tiếng Anh',
    'Quản Lý Dự Án',
    'Quản Trị Kinh Doanh',
    'An Toàn Thông Tin',
  ];
  mucchungchi: string[] = [
    'Đại Học',
    'Nâng Cao',
    'Chuyên Nghiệp',
    'Sau Đại Học',
  ];
  cosodaotao: string[] = [
    'Đại Học Thủ Dầu Một',
    'Hội Đồng Anh',
    'Viện PMI',
    'Đại Học Quốc Gia',
    'Hội Đồng EC',
  ];
  diadiemdaotao: string[] = [
    'Bình Dương, Việt Nam',
    'TP. Hồ Chí Minh, Việt Nam',
    'Online',
    'Hà Nội, Việt Nam',
  ];
  ketquaxeploai: string[] = ['Xuất Sắc', 'Khá'];

  //select search
  searchTermCoSoDaoTao: string = '';
  searchTermLinhVucChungChi: string = '';
  searchTermDiaDiemDaoTao: string = '';

  filteredCoSoDaoTao: string[] = [];
  filteredLinhVucChungChi: string[] = [];
  filteredDiaDiemDaoTao: string[] = [];

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

  filterLinhVucChungChi(search: string) {
    if (!search) {
      this.filteredLinhVucChungChi = this.linhvucchungchi.slice();
    } else {
      const filterValue = search.toLowerCase();
      this.filteredLinhVucChungChi = this.linhvucchungchi.filter((option) =>
        option.toLowerCase().includes(filterValue)
      );
    }
  }

  filterDiaDiemDaoTao(search: string) {
    if (!search) {
      this.filteredDiaDiemDaoTao = this.diadiemdaotao.slice();
    } else {
      const filterValue = search.toLowerCase();
      this.filteredDiaDiemDaoTao = this.diadiemdaotao.filter((option) =>
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
  certificateObj: Certificate = new Certificate();

  constructor(
    private _dialog: MatDialogRef<PopupCertificateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private masterService: MasterService
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.certificateObj = this.data;

      this.certificateObj.DateStart = new Date(this.data.DateStart);
      this.certificateObj.DateEnd = new Date(this.data.DateEnd);
      this.certificateObj.DateCertificate = new Date(this.data.DateCertificate);
    }
    this.filteredCoSoDaoTao = this.cosodaotao.slice();
    this.filteredLinhVucChungChi = this.linhvucchungchi.slice();
    this.filteredDiaDiemDaoTao = this.diadiemdaotao.slice();
  }

  filename: string = '';

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.filename = file.name; // Extract the file name
      this.certificateObj.File = file.name; // Store only the file name in the model
    }
  }

  // Thao tác
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
      this.masterService.updateCertificate(this.certificateObj).subscribe(
        (res) => {
          console.log('Update thành công:', res);
          alert('Cập nhật thành công!!');
          this._dialog.close();
          this.certificateObj = new Certificate();
        },
        (error) => {
          console.error('Lỗi khi update:', error);
        }
      );
    } else {
      this.masterService.addCertificate(this.certificateObj).subscribe(
        (res) => {
          console.log('Thêm mới thành công:', res);
          alert('Thêm mới thành công!!');
          this._dialog.close();
          this.certificateObj = new Certificate();
        },
        (error) => {
          console.error('Lỗi khi thêm:', error);
        }
      );
    }
  }
}
