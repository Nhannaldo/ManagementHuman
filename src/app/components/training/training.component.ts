import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MasterService } from 'src/Service/master.service';
import { PopupTrainingComponent } from 'src/app/popups/popup-training/popup-training.component';
import { PopupTrainingDetailComponent } from 'src/app/popups/popup-training-detail/popup-training-detail.component';
import { ITraining } from 'src/model/model';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css'],
})
export class TrainingComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = [
    'STT',
    'DateStart',
    'DateEnd',
    'CourseTrain',
    'OrganizeForm',
    'UnitTrain',
    'Unit',
    'DuAnDaoTao',
    'Function',
  ];

  dataSource = new MatTableDataSource<ITraining>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private _dialog: MatDialog,
    private masterService: MasterService
  ) {}

  ngOnInit(): void {
    this.loadTraining();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadTraining() {
    this.masterService.getAllTraining().subscribe((data: ITraining[]) => {
      const listTraining = data.filter((edu) => edu.status_id === true);
      this.dataSource.data = listTraining;
    });
  }

  openAddDialogForm() {
    const dialogRef = this._dialog.open(PopupTrainingComponent);
    dialogRef.afterClosed().subscribe((result) => {
      this.loadTraining();
    });
  }

  openEditDialogForm(data: any) {
    const dialogRef = this._dialog.open(PopupTrainingComponent, {
      data: { ...data },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.loadTraining();
    });
  }

  openDialogFormDetail(data: ITraining) {
    // console.log('detail:', data);
    this._dialog.open(PopupTrainingDetailComponent, { data });
  }

  onDelete(id: number): void {
    if (confirm('Bạn có chắc muốn xóa thông tin này?')) {
      this.masterService.deleteTraining(id).subscribe(
        (result) => {
          if (result) {
            alert('Delete successful');
            this.loadTraining();
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
