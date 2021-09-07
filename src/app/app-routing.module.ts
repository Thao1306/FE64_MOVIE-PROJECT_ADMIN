import { EditUserComponent } from './users/edit-user/edit-user.component';
import { DeleteUserComponent } from './users/delete-user/delete-user.component';
import { ListUsersComponent } from './users/list-users/list-users.component';
import { ViewUsersComponent } from './users/view-users/view-users.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'create', component: AddUserComponent},
  { path: 'view/:id', component: ViewUsersComponent},
  { path: 'list', component: ListUsersComponent},
  { path: 'delete/:id', component: DeleteUserComponent},
  { path: 'edit/:id', component: EditUserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
