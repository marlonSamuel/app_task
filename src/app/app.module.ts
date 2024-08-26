import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from '../environments/enviroment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MaterialModule } from './material.module';
import { TodoModule } from './todos/todo.module';
import { AuthModule } from './auth/auth.module';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { errorInterceptor } from './core/interceptors/error.interceptor';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { MatIcon } from '@angular/material/icon';
import { StoreModule } from '@ngrx/store';
import { metaReducers, appReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { LoadingSpinnerModule } from './shared/loading/loading-spinner.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ToastrModule } from 'ngx-toastr'; // Importa ToastrModule

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    TodoModule,
    LoadingSpinnerModule,
    AuthModule,
    MatIcon,
    StoreModule.forRoot(appReducers, {
      metaReducers
    }),
    SweetAlert2Module.forRoot(),
    ToastrModule.forRoot(), // Configura ToastrModule
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideHttpClient(withInterceptors([errorInterceptor])),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
