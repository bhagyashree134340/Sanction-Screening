import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { FileValidator } from 'ngx-material-file-input';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  

  constructor() { }

  ngOnInit(): void {
    
  }
  
  // onClickSubmit(data) {
  //   alert("Entered Email id : " + data.upload);
  // }



}
