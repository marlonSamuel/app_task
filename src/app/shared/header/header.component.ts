import { Component } from '@angular/core';
import { auth, userData } from '@app/auth/auth.action';
import { User } from '@app/auth/models/models-response.login';
import { AuthService } from '@app/auth/services/auth.service';
import { AppState } from '@app/reducers';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

/**
 * Component for displaying the header of the application.
 * Manages user authentication status and user data display.
*/
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  show: boolean = false;
  uiSubscription: Subscription = new Subscription();
  user: User = {
    id: '',
    email: '',
    isNew: false
  };

  /**
   * Constructs the HeaderComponent with dependencies.
   * @param authService - Service for authentication operations
   * @param store - NgRx store for managing application state
  */
  constructor(private authService: AuthService, private store: Store<AppState>,){}

  /**
   * Initializes the component.
   * Subscribes to user authentication and user data changes in the store.
   * Retrieves the current user from AuthService and updates the store if a user is found.
   */
  ngOnInit(): void {
    this.uiSubscription = this.store.select('user')
    .subscribe( user => {
      this.show = user.auth;
      this.user = user.user;
      console.log('suscrito a user',this.user);
  });

   const user = this.authService.getUser();
   if(user){
    this.store.dispatch(userData({user: {id: user.id, email: user.email, isNew: false}}));
   }
    
  }

  /**
   * Log out the user by calling AuthService and dispatches actions to update the store.
  */
  logout() {
    this.authService.logout();
    this.store.dispatch(auth({login: false}));
    this.store.dispatch(userData({user: {id: '', email: '', isNew: false}}));
  }

  /**
   * Cleans up the subscription to avoid memory leaks.
  */
  ngOnDestroy(): void {
    //destroy subscription
    this.uiSubscription.unsubscribe(); 
  }

}
