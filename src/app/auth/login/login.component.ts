import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { LoginResponse } from '../models/models-response.login';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '@app/reducers';
import { Subscription } from 'rxjs';
import { isLoading, stopLoading } from '@app/shared/ui.action';
import { auth, userData } from '../auth.action';
import { NotificationService } from '@app/shared/services/notification.service';
import Swal from 'sweetalert2';


/**
 * LoginComponent is responsible for handling the login process of the application.
 * It includes form validation, user authentication, and navigation based on authentication results.
 */

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup = this.fb.group({});
  loading: boolean = false;
  uiSubscription: Subscription = new Subscription();

  /**
   * Constructs the LoginComponent and initializes the form and services.
   * @param {FormBuilder} fb - The FormBuilder service to create form controls.
   * @param {AuthService} authService - The service for authentication operations.
   * @param {Store<AppState>} store - The NgRx store for state management.
   * @param {Router} router - The Angular Router for navigation.
   * @param {NotificationService} notificationService - The service to show notifications.
   */
  constructor(private fb: FormBuilder, 
            private authService: AuthService, 
            private store: Store<AppState>,
            private router: Router,
            private notificationService: NotificationService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }


  /**
   * Initializes the component, sets up the form, and subscribes to the UI state.
  */
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['',[Validators.required, Validators.email]]
    });

    this.uiSubscription = this.store.select('ui')
        .subscribe( ui => {
          this.loading = ui.isLoading;
    });
  }

  /**
   * Handles form submission, performs login, and manages navigation and notifications.
  */
  onSubmit(): void {
    if (this.loginForm.valid) {
      this.store.dispatch(isLoading());
      const email = this.loginForm.value.email;
      this.authService.login(email).subscribe({
        next: (response:LoginResponse) => {
          this.store.dispatch(stopLoading());
          this.store.dispatch(auth({login: true}));
          this.store.dispatch(userData({user: response.user}));
          
          this.notificationService.showSuccess('Logín exitoso');
          if(response.user.isNew){
            Swal.fire('Creado!', 'Nuevo usuario ha sido creado.', 'success');
          }
          this.router.navigate(['']);
        },
        error: (error: Error) => {
          this.store.dispatch(stopLoading());
          // Manejo del error
          this.notificationService.showSuccess('No se pudo realizar login '+error.message);
        }
      });

    }
  }

  /**
   * Cleans up subscriptions when the component is destroyed.
  */
  ngOnDestroy(): void {
    //destroy subscription
    this.uiSubscription.unsubscribe();
    
  }
}
