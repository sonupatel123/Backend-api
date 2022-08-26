import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostObject } from '../dashboard/model';
import { ApiServiceService } from '../api-service.service';
import { HttpClient } from '@angular/common/http';
import { elementAt } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private api: ApiServiceService,
    private http: HttpClient) { }
  postForm!: FormGroup;
  myObject: PostObject = new PostObject();
  public showUpdate: boolean = false;
  public showAdd: boolean = true;
  public postData: any;
  public editId: any;
  public array: any;
  public editArray: any;
  ngOnInit(): void {
    let userPostId = localStorage.getItem('userId');
    this.getdata(userPostId);
    this.postForm = this.formBuilder.group({
      title: ['', Validators.required],
      subtitle: ['', Validators.required],
      tag: ['', Validators.required],
      content: ['', Validators.required]
    });
  }
  redirectToAddPost() {
    this.router.navigate(['addPost']);
  }
  async getdata(id: any) {
    await this.api.getPost(id).subscribe((res: any) => {
      this.postData = res;
    })
  }

  savePost() {
    this.myObject.title = this.postForm.value.title;
    this.myObject.subtitle = this.postForm.value.subtitle;
    this.myObject.tag = this.postForm.value.tag;
    this.myObject.content = this.postForm.value.content;
    this.postData.post.push(this.myObject);
    this.api.createPost(this.postData, this.postData._id).subscribe(res => {
      alert("post added successfully");
      let ref = document.getElementById("cancle");
      ref?.click();
      this.postForm.reset();
      this.router.navigate(["dashboard"]);
    })
  }
  deleteDate(array: any, id: any) {
    let deleteArray: any = [];
    deleteArray = array.post;
    deleteArray.forEach((element: any, inx: any) => {
      if (element._id === id) {
        deleteArray.splice(inx, 1);
      }
    });
    this.api.deletePost(array, array._id).subscribe(res => {
      alert("employee deleted");
      this.getdata(array[0]._id);
    })
  }
  onEdit(postData: any, a: any) {
    this.editArray = postData;
    this.showAdd = false;
    this.showUpdate = true;
    this.editId = a._id;
    this.postForm.controls['title'].setValue(a.title);
    this.postForm.controls['subtitle'].setValue(a.subtitle);
    this.postForm.controls['tag'].setValue(a.tag);
    this.postForm.controls['content'].setValue(a.content);
  }
  updatePost() {
    this.editArray.post.forEach((element: any) => {
      if (element._id === this.editId) {
        element.title = this.postForm.value.title
        element.subtitle = this.postForm.value.subtitle
        element.tag = this.postForm.value.tag
        element.content = this.postForm.value.content
      }
    });
    this.api.editPost(this.postData, this.postData._id).subscribe((res: any) => {
      let ref = document.getElementById("cancle");
      ref?.click();
      this.postForm.reset();
      alert("employee added successfully");
      this.router.navigate(["dashboard"]);
      this.showUpdate = false;
      this.showAdd = true;
    })
  }
}
