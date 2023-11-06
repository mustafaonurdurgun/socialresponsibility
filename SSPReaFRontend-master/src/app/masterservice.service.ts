import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class MasterserviceService {

  constructor(private http: HttpClient) { }
  GetAllUsers() {
    return this.http.get('https://localhost:7118/Customer/GetAll');
  }
  
}
