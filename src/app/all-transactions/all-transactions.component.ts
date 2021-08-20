import { FunctionCall } from '@angular/compiler';
import { Component, NgModule, OnInit, SimpleChanges } from '@angular/core';
import { DisplayService } from '../display.service';
import { DialogUtility } from '@syncfusion/ej2-popups';

@Component({
  selector: 'app-all-transactions',
  templateUrl: './all-transactions.component.html',
  styleUrls: ['./all-transactions.component.css']
})

export class AllTransactionsComponent implements OnInit {

  transactions = [
    {
      transactionRef: "123456789012",
      valueDate: "02012021",
      payerName: "VickeyMickey",
      payerAccount: "200001020111",
      payeeName: "KamleshPatel",
      payeeAccount: "200001020099",
      amount: 9999.90,
      status: "null"
    },
    {
      transactionRef: "123452359012",
      valueDate: "03062021",
      payerName: "AnilMehtanin",
      payerAccount: "200001020112",
      payeeName: "KanyaKaur",
      payeeAccount: "200001020919",
      amount: 9993.00,
      status: "null"
    },
  ]

  constructor(private service: DisplayService) { }
  screenFlag = 0;

  ngOnInit(): void {
    this.transactions = [];
    this.service.showAllTransactions().subscribe(response => { this.transactions = response })
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes.transactions);
  }

  sanctionScreen() {
    this.screenFlag=1;
    this.service.sanctionScreen().subscribe(res => { console.log(res) });
    window.location.reload();
  }

  exit() {
    this.service.exit().subscribe(res => { console.log(res) });
  }

  DialogObj;

  onOpenDialog() {
    console.log("inside open dialog");
    this.DialogObj = DialogUtility.confirm({
      title: ' Confirmation Dialog',
      content: "This is a Confirmation Dialog!",
      position: { X: "center", Y: "center"},
      okButton: { text: 'OK', click: this.okClick.bind(this) },
      cancelButton: { text: 'Cancel', click: this.cancelClick.bind(this) },
      showCloseIcon: false,
      closeOnEscape: false,
      
      animationSettings: { effect: 'Zoom' }
    });
  }
  private okClick(): void {
    alert('you clicked OK button');
  }

  private cancelClick(): void {
    this.DialogObj.hide();
  }



}

//http://localhost:8086/displayAll
//http://localhost:8086//displayStatus/Valid%20Pass


