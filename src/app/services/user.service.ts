import { IUser, IShowTicket } from './../models/user';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userList = new BehaviorSubject<IUser[]>([]);
  showTicket = new BehaviorSubject<IShowTicket[]> ([]);

  setUserList = (list: IUser[]) => {
    this.userList.next(list);
  };

  setShowTicket = (showTicket: IShowTicket[]) => {
    this.showTicket.next(showTicket)
  }


  constructor() { }
}
