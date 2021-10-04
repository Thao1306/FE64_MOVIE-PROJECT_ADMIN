import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountAdminComponent } from './account-admin/account-admin.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AccountAdminComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
  ],
  exports: [
    AccountAdminComponent
  ]
})
export class AccountAdminModule { }
