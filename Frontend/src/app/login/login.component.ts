import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router'; // Para navegar entre as páginas
import { LoginService } from '../services/login.service';

@Component({
  selector: 'login',
  standalone: false,

  templateUrl: './login.component.html',
  styleUrl: './login.component.css'

})
export class LoginComponent {

  constructor(
    private router: Router,
    private auth: AuthService,
    private loginService: LoginService,
  ) { }

  login() {

    this.auth.loginWithRedirect({
      appState: { target: 'http://localhost:4200' }  // Use appState para armazenar o redirecionamento
    });

  }

  logout() {
    this.loginService.logout();
  }
}
