import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '@auth0/auth0-angular';
import { HttpClient } from '@angular/common/http';
import { User } from './interfaces/user.interface';
import { UserService } from './services/user.service';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  standalone: false,
  // imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',

  styleUrl: './app.component.css'
})

export class AppComponent {
  user: User = { id: '', userName: '', email: '', role: '' };  // Inicializando o objeto User
  user$!: User;
  isAuthenticated = false;
  id = 0;
  name = "";
  email = "";
  role = "";

  constructor(
    private router: Router,
    private auth: AuthService,
    private userService: UserService,
    private loginService: LoginService
  ) {

    this.auth.isAuthenticated$.subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;
      if (isAuthenticated) {

        // this.auth.logout({ logoutParams: { returnTo: window.location.origin } });

        this.auth.user$.subscribe(user => {
          this.user$ = user as User;
          // alert('Usuário autenticado: ' + this.user$);
          // console.log('Usuário autenticado:', this.user$);

          this.auth.user$.subscribe((authUser) => {
            if (authUser) {
              this.user = {
                id: '',  // O ID pode ser preenchido conforme necessário (gerado pelo backend)
                userName: authUser.name || '',  // Atribui o nome, se disponível
                email: authUser.email || '',    // Atribui o e-mail, se disponível
                role: this.extractRoleFromEmail(authUser.email || '')  // Atribui o papel com base no email
              };

              // alert(`Usuário: ${this.user.userName}, E-mail: ${this.user.email}, Role: ${this.user.role}`);

              this.checkIfUserIsSaved(this.user);

              const roleUrl = this.loginService.checkUserRole(this.user.email);
              if (roleUrl) {
                // alert('Redirecionando para: ' + roleUrl);
                // console.log(roleUrl);
                this.router.navigate([roleUrl]);

              } else {
                console.error('Nao foi possível determinar a URL de redirecionamento');
              }

            }
          })

          // this.router.navigate(['/home']); // Redireciona para a home após o login
        });
      }
      // else {
      //   this.router.navigate(['login']); // Redireciona para a página de login se não estiver autenticado
      // }
    });
  }

  login() {
    //const redirectUri = window.location.origin + '';
    // console.log(redirectUri);

    //  localStorage.setItem('redirectUrl', redirectUri);

    // Use as opções padrão e passe `redirectUri` como parte da configuração do login
    this.auth.loginWithRedirect({
      appState: { target: 'http://localhost:4200/home' }  // Use appState para armazenar o redirecionamento
    });

  }

  logout() {
    alert(window.location.origin);
    console.log(window.location.origin);
    this.auth.logout({ logoutParams: { returnTo: window.location.origin } });

  }


  checkIfUserIsSaved(user: User) {

    // Envia dados do usuário para o backend
    this.userService.getUser(user).subscribe(
      response => {
        console.log('Usuário salvo com sucesso no backend', response);
      },
      error => {
        console.error('Erro ao salvar usuário no backend', error);
      }
    );
  }

  extractRoleFromEmail(email: string): string {
    // Extraia o papel (role) do email, se estiver no formato "name@role.sarm"
    const match = email.match(/^[^@]+@(admin|doctor|patient)\.sarm$/);
    return match ? match[1] : 'unknown'; // Retorna o papel ou 'unknown' se não corresponder
  }
}

const currentDate = new Date();
const year = currentDate.getFullYear().toString();
const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
const uniqueId = '000001';
export const hardCodedPatientId = `${year}${month}${uniqueId}`;