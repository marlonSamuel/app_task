import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from './reducers';
import { AuthService } from './auth/services/auth.service';
import { auth } from './auth/auth.action';

/**
 * The root component of the application.
 * 
 * Handles the main application logic, including user authentication state and 
 * updating the UI based on the authentication status.
 */

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'app-task';
  show: boolean = false;
  uiSubscription: Subscription = new Subscription();

  constructor(private authService: AuthService, private store: Store<AppState>,){}


   /**
   * Subscribes to the 'user' slice of the store to update the 'show' flag based on 
   * the user's authentication status.
   * 
   * Also checks the user's authentication status on component initialization and 
   * dispatches an action to update the store.
   */
  ngOnInit(): void {
    this.uiSubscription = this.store.select('user')
      .subscribe( user => {
        this.show = user.auth;
        console.log('header suscrito a user',user.auth);
    });

    this.authService.checkAuth().subscribe({
      next: (resp: boolean)=>{
        this.store.dispatch(auth({login: resp}));
      }
    });
  }

    /**
   * 
   * Unsubscribes from all subscriptions to prevent memory leaks.
   */
  ngOnDestroy(): void {
    //destroy subscription
    this.uiSubscription.unsubscribe(); 
  }
}
