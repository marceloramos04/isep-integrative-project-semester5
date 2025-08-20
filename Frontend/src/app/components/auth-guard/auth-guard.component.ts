import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

@Component({
    selector: 'app-auth-guard',
    templateUrl: './auth-guard.component.html',
    styleUrl: './auth-guard.component.css',
    standalone: false
})
export class AuthGuardComponent {


  constructor(private auth: AuthService, private router: Router) { }

}
