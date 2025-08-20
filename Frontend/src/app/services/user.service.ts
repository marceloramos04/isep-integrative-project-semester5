import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { User } from "../interfaces/user.interface";
import { backendUrl } from "../app.config";
import { Observable } from "rxjs";



@Injectable({
    providedIn: 'root',
})
    
export class UserService{
    url = backendUrl + '/User';

    constructor(private httpclient: HttpClient) {
    
    }
    
    getUser(user: User):Observable<User> {
     return  this.httpclient.post<User>(this.url, user);
    }
    
}