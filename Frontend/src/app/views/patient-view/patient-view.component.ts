import { RouterLink, RouterOutlet } from '@angular/router'
import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '@auth0/auth0-angular';
import { RouterModule } from '@angular/router'; // Importar RouterModule
import { LoginService } from 'src/app/services/login.service';

@Component({
    selector: 'app-patient-view',
    templateUrl: './patient-view.component.html',
    styleUrl: './patient-view.component.css',
    standalone: false
})
export class PatientViewComponent {
    constructor(public auth: AuthService, private loginService:LoginService) { }

    private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  
  logout() {
    this.loginService.logout();
  }
}
