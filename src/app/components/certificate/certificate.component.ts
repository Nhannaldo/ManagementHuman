import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MasterService } from 'src/Service/master.service';
import { PopupCertificateComponent } from 'src/app/popups/popup-certificate/popup-certificate.component';
import { PopupCertificateDetailComponent } from 'src/app/popups/popup-certificate-detail/popup-certificate-detail.component';
import { ICertificate } from 'src/model/model';

@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.css'],
})
export class CertificateComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = [
    'STT',
    'DateStart',
    'DateEnd',
    'DateCertificate',
    'DegreeCertificate',
    'LevelCertificate',
    'InternationalCertificate',
    'Function',
  ];

  dataSource = new MatTableDataSource<ICertificate>([]);
  startDate: Date | null = null;
  endDate: Date | null = null;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private _dialog: MatDialog,
    private masterService: MasterService
  ) {}

  ngOnInit(): void {
    this.loadCertificate();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadCertificate() {
    this.masterService.getAllCertificate().subscribe((data: ICertificate[]) => {
      const listCertificate = data.filter((edu) => edu.status_id === true);
      this.dataSource.data = listCertificate;
    });
  }

  openAddDialogForm() {
    const dialogRef = this._dialog.open(PopupCertificateComponent);
    dialogRef.afterClosed().subscribe((result) => {
      this.loadCertificate();
    });
  }

  openEditDialogForm(data: any) {
    const dialogRef = this._dialog.open(PopupCertificateComponent, {
      data: { ...data },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.loadCertificate();
    });
  }

  openDialogFormDetail(data: ICertificate) {
    // console.log('detail:', data);
    this._dialog.open(PopupCertificateDetailComponent, { data });
  }

  applyDateFilter() {
    // Check if no dates are provided and reset data if so
    if (!this.startDate && !this.endDate) {
      console.log(
        'No dates selected. Displaying all data:',
        this.dataSource.data
      );
      return;
    }
    // Kiểm tra ngày bắt đầu và ngày kết thúc nhập vào và đặt giờ cho chính xác
    const start = this.startDate
      ? new Date(this.startDate).setHours(0, 0, 0, 0)
      : null;
    const end = this.endDate
      ? new Date(this.endDate).setHours(23, 59, 59, 999)
      : null;

    // Log ra để kiểm tra
    console.log(
      'Ngày bắt đầu:',
      start ? new Date(start).toLocaleDateString('vi-VN') : 'Chưa chọn'
    );
    console.log(
      'Ngày kết thúc:',
      end ? new Date(end).toLocaleDateString('vi-VN') : 'Chưa chọn'
    );

    // Lọc dữ liệu theo ba trường hợp:
    const filteredData = this.dataSource.data.filter(
      (education: ICertificate) => {
        const dateStart = new Date(education.DateStart).getTime();
        const dateEnd = new Date(education.DateEnd).getTime();

        // Trường hợp chỉ nhập Ngày bắt đầu
        if (start && !end) {
          return dateStart >= start && dateEnd >= start;
        }

        // Trường hợp chỉ nhập Ngày kết thúc
        if (!start && end) {
          return dateStart <= end && dateEnd <= end; // Lọc với Ngày bắt đầu <= Ngày kết thúc và Ngày kết thúc >= Ngày bắt đầu dữ liệu
        }

        // Trường hợp nhập cả Ngày bắt đầu và Ngày kết thúc
        if (start && end) {
          return dateStart >= start && dateEnd <= end;
        }

        return true; // Nếu không có Ngày bắt đầu và Ngày kết thúc, trả về tất cả dữ liệu
      }
    );

    // Gán lại dataSource với dữ liệu đã lọc
    this.dataSource.data = filteredData;

    console.log('Dữ liệu sau khi lọc:', filteredData);
  }

  refresh() {
    // Reset date fields to empty
    this.startDate = null;
    this.endDate = null;
    this.loadCertificate();
  }
  onDelete(id: number): void {
    if (confirm('Bạn có chắc muốn xóa thông tin này?')) {
      this.masterService.deleteCertificate(id).subscribe(
        (result) => {
          if (result) {
            alert('Delete successful');
            this.loadCertificate();
          }
        },
        (error) => {
          console.error('Delete failed:', error);
          alert('Delete failed. Please try again.');
        }
      );
    }
  }
}
