import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

/**
 * Service to handle notifications using Toastr.
 * Provides methods for showing success and error messages.
*/

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastr: ToastrService) { }

  /**
   * Displays a success notification with a given message.
   * 
   * @param message - The message to display in the success notification.
   */
  showSuccess(message: string) {
    this.toastr.success(message, 'Éxito');
  }
  
  /**
   * Displays an error notification with a given message.
   * 
   * @param message - The message to display in the error notification.
   */
  showError(message: string) {
    this.toastr.error(message, 'Oppss!!');
  }
}
