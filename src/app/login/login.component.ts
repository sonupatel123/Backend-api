import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private hhtp: HttpClient
  ) { }
  loginForm!: FormGroup;
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
  });
  }

  login() {
    this.hhtp.get("http://localhost:9999/api/logIn").subscribe((res: any )=>
      {
        const data = res.find((a:any) => {
          return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password;
        })
        if(data) {
          alert("login Successfull");
          this.router.navigate(['dashboard']);
          localStorage.setItem('userId', data._id.toString());
          this.loginForm.reset();
        } else {
          alert("No user found");
        }
      }
      )
  }
  get loginFormControl() {
    return this.loginForm.controls;
  }

}
