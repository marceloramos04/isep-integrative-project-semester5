import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router'; // Para navegar entre as páginas

@Component({
  selector: 'app-home',
  standalone: false,
  // imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  title = 'Frontend';
  isLoggedIn: boolean = false;


  constructor(private auth: AuthService, private router: Router) {
   
  }

  logout(){
    alert(window.location.origin);
    console.log(window.location.origin);
    this.auth.logout({ logoutParams: { returnTo: window.location.origin } });
  }
 
}
