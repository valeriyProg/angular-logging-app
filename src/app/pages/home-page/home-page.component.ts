import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "../../auth/common/services/auth.service";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  constructor(private authService: AuthService, private http: HttpClient) { }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': this.authService.loggedUser.token
    })
  };

  ngOnInit() {
    this.http.get('http://dev.angulartest.digital-era.ru/api/user?perPage=-1', this.httpOptions).subscribe(result => {
      console.log(result);
    });
  }
}
