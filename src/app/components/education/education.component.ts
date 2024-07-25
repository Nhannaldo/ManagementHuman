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
