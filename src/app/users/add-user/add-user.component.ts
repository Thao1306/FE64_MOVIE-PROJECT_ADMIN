import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  @ViewChild('addUserForm') addUserForm!: NgForm;
  file: FileList | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
