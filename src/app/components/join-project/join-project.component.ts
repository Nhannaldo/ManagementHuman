import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MasterService } from 'src/Service/master.service';
import { PopupJoinProjectComponent } from 'src/app/popups/popup-join-project/popup-join-project.component';
import { PopupJoinProjectDetailComponent } from 'src/app/popups/popup-join-project-detail/popup-join-project-detail.component';
import { IJoinProject } from 'src/model/model';

@Component({
  selector: 'app-join-project',
  templateUrl: './join-project.component.html',
  styleUrls: ['./join-project.component.css'],
})
export class JoinProjectComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = [
    'STT',
    'DateStart',
    'DateEnd',
    'ProductName',
    'Description',
    'Function',
  ];

  dataSource = new MatTableDataSource<IJoinProject>([]);
  startDate: Date | null = null;
  endDate: Date | null = null;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private _dialog: MatDialog,
    private masterService: MasterService
  ) {}

  ngOnInit(): void {
    this.loadJoinProject();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadJoinProject() {
    this.masterService.getAllJoinProject().subscribe((data: IJoinProject[]) => {
      const listJoinProject = data.filter((edu) => edu.status_id === true);
      this.dataSource.data = listJoinProject;
    });
  }

  openAddDialogForm() {
    const dialogRef = this._dialog.open(PopupJoinProjectComponent);
    dialogRef.afterClosed().subscribe((result) => {
      this.loadJoinProject();
    });
  }

  openEditDialogForm(data: any) {
    const dialogRef = this._dialog.open(PopupJoinProjectComponent, {
      data: { ...data },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.loadJoinProject();
    });
  }

  openDialogFormDetail(data: IJoinProject) {
    // console.log('detail:', data);
    this._dialog.open(PopupJoinProjectDetailComponent, { data });
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
      (education: IJoinProject) => {
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
    this.loadJoinProject();
  }
  onDelete(id: number): void {
    if (confirm('Bạn có chắc muốn xóa thông tin này?')) {
      this.masterService.deleteJoinProject(id).subscribe(
        (result) => {
          if (result) {
            alert('Delete successful');
            this.loadJoinProject();
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
