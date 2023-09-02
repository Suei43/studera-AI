import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// import {HttpClient}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(private http: HttpClient){}

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

    this.http.post("https://6f07-102-89-41-131.ngrok-free.app/study-materials",
      {
        title: this.requestForm.value.title,
        timeframe: this.requestForm.value.timeframeDuration + this.requestForm.value.timeframeUnit,
        preference: this.requestForm.value.preference
      }
    ).subscribe(res => {
      console.log(res)
    })
  }

}
