import { Component } from '@angular/core';

/**
 * Component that displays a loading spinner overlay.
 * Used to indicate loading or processing states in the application.
*/

@Component({
  selector: 'app-loading-spinner',
  template: `
    <div class="overlay">
      <mat-spinner></mat-spinner>
    </div>
  `,
  styles: [`
    .overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }
  `]
})
export class LoadingSpinnerComponent {}