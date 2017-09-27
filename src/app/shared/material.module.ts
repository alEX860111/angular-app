import { NgModule } from '@angular/core';
import {
  MatListModule, MatCardModule, MatSidenavModule, MatIconModule, MatToolbarModule, MatButtonModule, MatDialogModule,
  MatMenuModule, MatInputModule, MatSelectModule, MatOptionModule, MatTooltipModule, MatSnackBarModule,
  MatPaginatorModule, MatTableModule, MatSortModule
} from '@angular/material';

@NgModule({
  imports: [MatListModule, MatCardModule, MatSidenavModule, MatIconModule, MatToolbarModule, MatButtonModule, MatDialogModule,
    MatMenuModule, MatInputModule, MatSelectModule, MatOptionModule, MatTooltipModule, MatSnackBarModule,
    MatPaginatorModule, MatTableModule, MatSortModule],
  exports: [MatListModule, MatCardModule, MatSidenavModule, MatIconModule, MatToolbarModule, MatButtonModule, MatDialogModule,
    MatMenuModule, MatInputModule, MatSelectModule, MatOptionModule, MatTooltipModule, MatSnackBarModule,
    MatPaginatorModule, MatTableModule, MatSortModule]
})
export class MaterialModule { }
