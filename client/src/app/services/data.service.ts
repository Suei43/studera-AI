import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  data: any = {}
  received: any[] = [];
  lastInfo: any = {};

  url: string = "http://localhost:5000/study-materials"

  constructor(private http: HttpClient, private router: Router) { }

  getInfo(info: {title: string, timeframe: string, preference: string}) {
    this.http.post(
      this.url,
      info
    ).subscribe({
      next: (res) => {
        this.lastInfo = info;
        console.log(res);
        this.data = res;
        this.data.title = info.title,
        this.data.timeframe = info.timeframe
        this.router.navigateByUrl("/course");
        this.received = (this.data.cache);
      },
      error: (err) => {
        console.log(err)
      },
      complete: () => {}
    })

  }

  retryPrompt() {
    this.http.post(
      "http://localhost:5000/re-study-materials", this.lastInfo
    ).subscribe({
      next: (res) => {
        console.log(res);
        this.data = res;
        this.data.title = this.lastInfo.title,
        this.data.timeframe = this.lastInfo.timeframe
        this.router.navigateByUrl("/course");
        this.received = (this.data.cache);
      },
      error: (err) => {
        console.log(err)
      },
      complete: () => {}
    })

  }

}
