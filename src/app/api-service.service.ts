import { Injectable, Type } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
const obj = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
  'Authorization': 'Bearer szdp79a2kz4wh4frjzuqu4sz6qeth8m3',
}
const objHeader = {
   headers : new HttpHeaders(obj)
}


@Injectable({
  providedIn: 'root'
})
  

export class ApiServiceService {

  constructor(private http : HttpClient) { }
  signUp(body: any) {
    return this.http.post("http://127.0.0.1:9999/api/signUp",body).pipe(map((res:any) =>{
      return res;
    }))
   }

   getPost(id: any) {
    return this.http.get("http://127.0.0.1:9999/api/getPost/"+id).pipe(map((res:any) =>{
      return res;
    }))
   }
   createPost(body: any, id: number) {
    return this.http.patch("http://localhost:9999/api/createPost/"+id,body).pipe(map(res =>{
      return res;
    }))
   }
   
   editPost(body: any, id: number) {
    return this.http.patch("http://localhost:9999/api/editPost/"+id,body).pipe(map(res =>{
      return res;
    }))
   }
   deletePost(body: any, id: number) {
    return this.http.patch("http://localhost:9999/api/deletePost/"+id, body).pipe(map(res =>{
      return res;
    }))
   }
  }
