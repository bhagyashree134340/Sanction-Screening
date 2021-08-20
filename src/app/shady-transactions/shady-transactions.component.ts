import { Component, OnInit } from '@angular/core';
import { DisplayService } from '../display.service';

@Component({
  selector: 'app-shady-transactions',
  templateUrl: './shady-transactions.component.html',
  styleUrls: ['./shady-transactions.component.css']
})
export class ShadyTransactionsComponent implements OnInit {

  constructor(private service:DisplayService) { }

  transactions =[]

  ngOnInit(): void {
    this.service.showShadyTransactions().subscribe(response => { this.transactions = response })
  }

  exit() {

    //this.onOpenDialog();
      //do you wanna exit this transaction before screening it? 
      //If you press ok, this transactions will be lost, route change.
      //Cancel - stay on the same page
    this.service.exit().subscribe(res => { console.log(res) });
    //this.screenFlag = 0;
  }

}
