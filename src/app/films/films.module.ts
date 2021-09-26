import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddFilmComponent } from './add-film/add-film.component';
import { EditFilmComponent } from './edit-film/edit-film.component';
import { ShowFilmListComponent } from './show-film-list/show-film-list.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogContentDeleteFilmComponent } from './show-film-list/dialog-content-delete-film/dialog-content-delete-film.component';
import { CreateShowtimesFilmComponent } from './create-showtimes-film/create-showtimes-film.component';
import {MatExpansionModule} from '@angular/material/expansion';

@NgModule({
  declarations: [
    AddFilmComponent,
    EditFilmComponent,
    ShowFilmListComponent,
    DialogContentDeleteFilmComponent,
    CreateShowtimesFilmComponent,
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatPaginatorModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatDialogModule,
    MatExpansionModule
  ],
})
export class FilmsModule {}
