import { Component, ElementRef, EventEmitter, OnInit, Output, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AllTransactionsComponent } from '../all-transactions/all-transactions.component';
import { UploadFileService } from '../upload-file.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class HomeComponent implements OnInit {

  @ViewChild('uploadBtn') uploadBtn;
  @Output() myEvent = new EventEmitter();

  submitDisabled = true;
  selectedFiles: FileList;
  currentFile: File;

  constructor(private service: UploadFileService, private renderer: Renderer2) { }

  ngOnInit(): void {

  }
  ngAfterViewInit(): void {
    // We can access the TestComponent now that this portion of the view tree has been initiated.
    console.log(this.uploadBtn.nativeElement.disabled);
  }

  fileInputChange(upload, colorChange, event) {
    if (upload.value != null) {
      this.uploadBtn.nativeElement.disabled = false;
      this.renderer.addClass(this.uploadBtn.nativeElement, colorChange);
      console.log(upload.value._fileNames);
      this.selectedFiles = event.target.files;
      console.log(this.selectedFiles);
    }
    else {
      this.uploadBtn.nativeElement.disabled = true;
      this.renderer.removeClass(this.uploadBtn.nativeElement, colorChange);
    }

  }

  onSubmit(upload) {
    //console.log(upload.value._fileNames);
    // for(let i in this.selectedFiles.item){

    // }
    console.log(this.selectedFiles.length)
    for (let i=0; i< this.selectedFiles.length; i++) {
      this.currentFile = this.selectedFiles.item(i);
      console.log(this.currentFile);
      this.service.uploadFile(this.currentFile).subscribe(res => { console.log(res) });
    }

  }

}
