import { RouterLink, RouterOutlet } from '@angular/router'
import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
// import { AsyncPipe } from '@angular/common';
// import { MatToolbarModule } from '@angular/material/toolbar';
// import { MatButtonModule } from '@angular/material/button';
// import { MatSidenavModule } from '@angular/material/sidenav';
// import { MatListModule } from '@angular/material/list';
// import { MatIconModule } from '@angular/material/icon';
// import { MatExpansionModule } from '@angular/material/expansion';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '@auth0/auth0-angular';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-admin-view',
  standalone: false,
  // imports: [RouterLink,
  //   RouterOutlet,
  //   MatToolbarModule,
  //   MatButtonModule,
  //   MatSidenavModule,
  //   MatListModule,
  //   MatIconModule,
  //   AsyncPipe,
  //   MatExpansionModule,
  // ],
  templateUrl: './admin-view.component.html',
  styleUrl: './admin-view.component.css'
})

export class AdminViewComponent {

  constructor(public auth: AuthService,private loginService:LoginService) { }

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
