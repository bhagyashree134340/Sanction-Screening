import { Component, OnInit } from '@angular/core';
import { DisplayService } from '../display.service';

@Component({
  selector: 'app-validation-pass',
  templateUrl: './validation-pass.component.html',
  styleUrls: ['./validation-pass.component.css']
})
export class ValidationPassComponent implements OnInit {

  transactions = [
    {
      transactionRef : "123456789012",
      valueDate: "02012021",
      payerName : "VickeyMickey",
      payerAccount : "200001020111",
      payeeName : "KamleshPatel",
      payeeAccount : "200001020099",
      amount : 9999.90,
      status : "null"
    },
    {
      transactionRef : "123452359012",
      valueDate: "03062021",
      payerName : "AnilMehtanin",
      payerAccount: "200001020112",
      payeeName : "KanyaKaur",
      payeeAccount : "200001020919",
      amount : 9993.00,
      status : "null"
    },
    {
      transactionRef : "123456789019",
      valueDate: "02092011",
      payerName : "NarayananIyer",
      payerAccount : "200001020113",
      payeeName : "AshwiniKumari",
      payeeAccount : "200001020992",
      amount : 999.00,
      status : "null"
    },
    {
      transactionRef : "123456789001",
      valueDate: "89300111",
      payerName : "KamalNathan",
      payerAccount : "200001020141",
      payeeName : "SunainaPatil",
      payeeAccount : "200001020939",
      amount : 1256.00,
      status : "null"
    }
  ]

  constructor(private service: DisplayService) { }

  ngOnInit(): void {
    this.service.showValidPassTransactions().subscribe(response=>{this.transactions=response})
  }

  
  sanctionScreen(){
    this.service.sanctionScreen().subscribe(res=> {console.log(res)});
    window.location.reload();
  }

  exit(){
    this.service.exit().subscribe(res => { console.log(res) });
  }

}
