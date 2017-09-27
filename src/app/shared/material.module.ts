import { NgModule } from '@angular/core';
import {
  MdListModule, MdCardModule, MdSidenavModule, MdIconModule, MdToolbarModule, MdButtonModule, MdDialogModule,
  MdMenuModule, MdInputModule, MdSelectModule, MdOptionModule, MdTooltipModule, MdSnackBarModule,
  MdPaginatorModule, MdTableModule, MdSortModule
} from '@angular/material';

@NgModule({
  imports: [MdListModule, MdCardModule, MdSidenavModule, MdIconModule, MdToolbarModule, MdButtonModule, MdDialogModule,
    MdMenuModule, MdInputModule, MdSelectModule, MdOptionModule, MdTooltipModule, MdSnackBarModule,
    MdPaginatorModule, MdTableModule, MdSortModule],
  exports: [MdListModule, MdCardModule, MdSidenavModule, MdIconModule, MdToolbarModule, MdButtonModule, MdDialogModule,
    MdMenuModule, MdInputModule, MdSelectModule, MdOptionModule, MdTooltipModule, MdSnackBarModule,
    MdPaginatorModule, MdTableModule, MdSortModule]
})
export class MaterialModule { }


