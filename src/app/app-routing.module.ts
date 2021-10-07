import { EditUserComponent } from './users/edit-user/edit-user.component';
import { ListUsersComponent } from './users/list-users/list-users.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddFilmComponent } from './films/add-film/add-film.component';
import { ShowFilmListComponent } from './films/show-film-list/show-film-list.component';
import { EditFilmComponent } from './films/edit-film/edit-film.component';
import { CreateShowtimesFilmComponent } from './films/create-showtimes-film/create-showtimes-film.component';
import { AccountAdminComponent } from './account-admin/account-admin/account-admin.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  { path: '', component: AccountAdminComponent, canActivate: [LoginGuard] },
  { path: 'add-user', component: AddUserComponent, canActivate: [AuthGuard] },
  {
    path: 'list-users',
    component: ListUsersComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-user/:id',
    component: EditUserComponent,
    canActivate: [AuthGuard],
  },
  { path: 'add-film', component: AddFilmComponent, canActivate: [AuthGuard] },
  {
    path: 'show-film',
    component: ShowFilmListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-film/:id',
    component: EditFilmComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'create-show-time/:id',
    component: CreateShowtimesFilmComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: '',
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
