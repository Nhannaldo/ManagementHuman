import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MasterService } from 'src/Service/master.service';
import { PopupEducationComponent } from 'src/app/popups/popup-education/popup-education.component';
import { PopupEducationDetailComponent } from 'src/app/popups/popup-education-detail/popup-education-detail.component';
import { IEducation } from 'src/model/model';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css'],
})
export class EducationComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = [
    'STT',
    'DateStart',
    'DateEnd',
    'StandardTrain',
    'SpecializedTrain',
    'IndustryTrain',
    'FormTrain',
    'BasisTrain',
    'Function',
  ];

  dataSource = new MatTableDataSource<IEducation>([]);
  startDate: Date | null = null;
  endDate: Date | null = null;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private _dialog: MatDialog,
    private masterService: MasterService
  ) {}

  ngOnInit(): void {
    this.loadEducation();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadEducation() {
    this.masterService.getAllEducation().subscribe((data: IEducation[]) => {
      const listEducation = data.filter((edu) => edu.status_id === true);
      this.dataSource.data = listEducation;
    });
  }

  openAddDialogForm() {
    const dialogRef = this._dialog.open(PopupEducationComponent);
    dialogRef.afterClosed().subscribe((result) => {
      this.loadEducation();
    });
  }

  openEditDialogForm(data: any) {
    const dialogRef = this._dialog.open(PopupEducationComponent, {
      data: { ...data },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.loadEducation();
    });
  }

  openDialogFormDetail(data: IEducation) {
    // console.log('detail:', data);
    this._dialog.open(PopupEducationDetailComponent, { data });
  }
  applyDateFilter() {
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
      (education: IEducation) => {
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
    this.loadEducation();
  }
  onDelete(id: number): void {
    if (confirm('Bạn có chắc muốn xóa thông tin này?')) {
      this.masterService.deleteEducation(id).subscribe(
        (result) => {
          if (result) {
            alert('Delete successful');
            this.loadEducation();
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
