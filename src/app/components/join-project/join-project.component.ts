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
