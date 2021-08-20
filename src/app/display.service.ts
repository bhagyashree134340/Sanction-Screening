import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DisplayService {

  constructor(private httpService : HttpClient) { }

  showAllTransactions(): Observable<any>{
    return this.httpService.get<any>('http://localhost:8086/displayAll');
  }

  showShadyTransactions(): Observable<any>{
    return this.httpService.get<any>('http://localhost:8086/displayShady');
  }

  showValidPassTransactions(): Observable<any>{
    return this.httpService.get<any>('http://localhost:8086//displayStatus/Valid%20Pass');
  }
  showValidFailTransactions(): Observable<any>{
    return this.httpService.get<any>('http://localhost:8086//displayStatus/Valid%20Fail');
  }
  showScreenPassTransactions(): Observable<any>{
    return this.httpService.get<any>('http://localhost:8086//displayStatus/Screen%20Pass');
  }
  showScreenFailTransactions(): Observable<any>{
    return this.httpService.get<any>('http://localhost:8086//displayStatus/Screen%20Fail');
  }
  sanctionScreen(){
    return this.httpService.get<any>('http://localhost:8086/checkSanctionList');
  }
  exit(){
    return this.httpService.get<any>('http://localhost:8086/exit');
  }
  
}
