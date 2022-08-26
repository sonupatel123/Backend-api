import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private hhtp: HttpClient
  ) { }
  signUpform!: FormGroup;
  
  ngOnInit(): void {
    this.signUpform = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
  });
  }

  onSubmit() {
    this.hhtp.post("http://localhost:9999/api/signUp", this.signUpform.value).subscribe(res =>{
      alert("user added successfully");
      this.router.navigate(['login']);
    })
  }


}
