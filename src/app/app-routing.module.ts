import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { TodoIndexComponent } from './todos/todo-index/todo-index.component';
import { authGuard } from './auth/guards/auth.guard';


/**
 * The application's routing configuration.
 * 
 * Defines the routes for navigating between different components and applies guards as necessary.
 * 
 * Routes:
 * - `login`: Route for the login component. Protected by the `authGuard` to prevent access if already authenticated.
 * - `''` (root): Route for the Todo index component. Also protected by the `authGuard`.
 * - `**`: Wildcard route for handling unknown paths. Redirects to the root route.
 */
const routes: Routes = [

    { path: 'login', 
        component: LoginComponent,
        canActivate: [authGuard] },
    {
        path: '',
        loadChildren: () => import('./todos/todo.module')
                            .then(m => m.TodoModule),
        canActivate: [ authGuard ]
    },
    { path: '**', redirectTo: '' }
];


@NgModule({
    imports: [
        RouterModule.forRoot( routes )
    ],
    exports: [
        RouterModule
    ]

})
export class AppRoutingModule {}
