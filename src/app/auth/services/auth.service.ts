import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { environment } from '@environments/enviroment';
import { LoginResponse, User } from '../models/models-response.login';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';

/**
 * Service for authentication-related operations.
*/
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiUrl+'/users'; // Usa la URL de la API del entorno

  constructor(private http: HttpClient, private router: Router) { }

  /**
   * Login user with the provided email.
   * @param email - The email address used for authentication.
   * @returns An Observable of the LoginResponse containing the token and user details.
  */
  login(email: string): Observable<LoginResponse> {
    const loginPayload = { email };
    return this.http.post<LoginResponse>(this.apiUrl, loginPayload).pipe(
      tap((response:LoginResponse )=> {
        if (response && response.token) {
          localStorage.setItem('authToken', response.token);
        }
      })
    );
  }


  /**
   * Checks if the user is authenticated based on the presence of an authentication token.
   * @returns An Observable of a boolean indicating whether the user is authenticated.
  */
  checkAuth(): Observable<boolean>{
    return of(!!localStorage.getItem('authToken'));
  }

  /**
   * Retrieves the user information from the authentication token.
   * @returns The User object if the token is present and valid; otherwise, null.
  */
  getUser(): User | null{
    const token = localStorage.getItem('authToken');
    if(token){
      const t : User = jwt_decode.jwtDecode(token);
      return t;
    }
    return null;
  }

  /**
   * Log out the user by removing the authentication token and redirecting to the login page.
   */
  logout() {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }
}
