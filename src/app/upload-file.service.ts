import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor(private http: HttpClient) { }

  uploadFile(sendFile){

    const formData: FormData = new FormData();

    formData.append('file', sendFile);

    const req = new HttpRequest('POST', 'http://localhost:8086/readTransactions', formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);

    // formData.append("file", sendFile, sendFile.name);
    // return this.http.get('http://localhost:8086/readTransactions', formData);
  }
}
