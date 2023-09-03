import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {

  constructor(public dataSrv: DataService, private router: Router){}

  title = '';
  timeframe = '';
  text = '';


  ngOnInit(): void {
    this.text = this.dataSrv.data.data
    this.title = this.dataSrv.data.title
    this.timeframe = this.dataSrv.data.timeframe;
    this.countdown();
  }

  gotoHomePage() {
    this.router.navigateByUrl("/");
  }


  countdown() {
    if (!this.timeframe?.length) {
      return
    }

    let info = this.timeframe.split(" ");
    let value = Number(info[0]);
    let unit = info[1];

    let countDownDate = 0;

    switch (unit) {
      case 'hours':
        countDownDate = (new Date().getTime() + (value*1000*60*60))
        break;

      case 'days':
        countDownDate = (new Date().getTime() + (value*1000*60*60*24))
        break;

      case 'weeks':
        countDownDate = (new Date().getTime() + (value*1000*60*60*24*7));
        break;

      case 'months':
        countDownDate = (new Date().getTime() + (value*1000*60*60*24*30));
        break;
    }
    // Set the date we're counting down to

    // Update the count down every 1 second
    let x = setInterval(function() {

      // Get today's date and time
      let now = new Date().getTime();

      // Find the distance between now and the count down date
      let distance = countDownDate - now;

      // Time calculations for days, hours, minutes and seconds
      let days = Math.floor(distance / (1000 * 60 * 60 * 24));
      let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Display the result in the element with id="demo"
      document.getElementById("countdown")!.innerHTML = days + "d |" + hours + "h |"
      + minutes + "m " + seconds + "s ";

      // If the count down is finished, write some text
      if (distance < 0) {
        clearInterval(x);
        document.getElementById("countdown")!.innerHTML = "0d 00h 00m 00s";
      }
    }, 1000);
  }

  retryPrompt() {
    console.log("Retrying");
    this.dataSrv.retryPrompt();
  }
}
