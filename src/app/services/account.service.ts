import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IAccAdmin } from '../models/account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  accInfo = new BehaviorSubject<IAccAdmin | null>(null)
  constructor(private http: HttpClient) { }

  getAccAdInfo = (accInfo: IAccAdmin) => {
    this.accInfo.next(accInfo)
  }
}
