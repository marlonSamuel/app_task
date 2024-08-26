import { createAction, props } from '@ngrx/store';
import { User } from './models/models-response.login';

/**
 * Action to set user data in the store.
 * @param user - The User object containing user details.
*/
export const userData = createAction('[USER Component] userData',
    props<{ user: User }>()
);


/**
 * Action to set authentication status in the store.
 * @param login - A boolean indicating whether the user is logged in or not.
*/
export const auth = createAction('[USER Auth] auth',
    props<{ login: boolean }>()
);