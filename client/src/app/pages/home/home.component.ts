import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(private http: HttpClient, public dataSrv: DataService, private router: Router){}

  isSubmitting = false;

  requestForm: FormGroup = new FormGroup({
    title: new FormControl("", Validators.required),
    timeframeDuration: new FormControl("", Validators.required),
    timeframeUnit: new FormControl("hours", Validators.required),
    preference: new FormControl("text", Validators.required)
  });

  submit() {
    console.log("submitted")
    console.log(this.requestForm.valid)
    console.log(this.requestForm.value.title)
    if (this.requestForm.invalid) {
      console.log("invalid input");
      return
    }

    let info = {
      title: this.requestForm.value.title,
      timeframe: this.requestForm.value.timeframeDuration +' '+ this.requestForm.value.timeframeUnit,
      preference: this.requestForm.value.preference
    }

    this.dataSrv.getInfo(info);
    this.isSubmitting = true;

  }

  gotoCoursePage() {
    this.router.navigateByUrl("/course")
  }

  get title() {
    return this.requestForm.get('title');
  }

  get duration() {
    return this.requestForm.get('timeframeDuration');
  }

}
