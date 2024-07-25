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
