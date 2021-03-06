import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { User } from './user/user';
import { UserService } from './user/user.service';
// import { faTwitter, faFacebookSquare, faInstagram } from '@fortawesome/free-brands-svg-icons';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'quantum-dashboard';
  isAuth = false;
  authSubscription: Subscription;
  userSubscription: Subscription;
  user: User;
  // faTwitter = faTwitter;
  // faFacebookSquare = faFacebookSquare;
  // faInstagram = faInstagram;

  constructor(
    private auth: AuthService,
    private userService: UserService,
    private router: Router
    ) {}

  ngOnInit() {
    this.auth.initAuthListener();
    this.authSubscription = this.auth.authChange.subscribe(authStatus => {
      this.isAuth = authStatus;
    });
    this.userSubscription = this.userService.userChanged.subscribe((user) => {
      this.user = user;
    })
  }

  formRouting(route: string) {
    this.userService.currentUserData(this.user.email);
    this.router.navigate([route]);
  }

  logout() {
    this.auth.logout();
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

}
