import { EditUserComponent } from './users/edit-user/edit-user.component';
import { DeleteUserComponent } from './users/delete-user/delete-user.component';
import { ListUsersComponent } from './users/list-users/list-users.component';
import { ViewUsersComponent } from './users/view-users/view-users.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddFilmComponent } from './films/add-film/add-film.component';
import { ShowFilmListComponent } from './films/show-film-list/show-film-list.component';
import { EditFilmComponent } from './films/edit-film/edit-film.component';
import { CreateShowtimesFilmComponent } from './films/create-showtimes-film/create-showtimes-film.component';

const routes: Routes = [
  { path: 'create', component: AddUserComponent },
  { path: 'view/:id', component: ViewUsersComponent },
  { path: 'list', component: ListUsersComponent },
  { path: 'delete/:id', component: DeleteUserComponent },
  { path: 'edit/:id', component: EditUserComponent },
  { path: 'add-film', component: AddFilmComponent },
  { path: 'show-film', component: ShowFilmListComponent },
  { path: 'edit-film/:id', component: EditFilmComponent },
  { path: 'create-show-time/:id', component: CreateShowtimesFilmComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
