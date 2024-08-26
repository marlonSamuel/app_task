import { createReducer, on , Action} from '@ngrx/store';
import { userData, auth } from './auth.action';
import { User } from './models/models-response.login';

/**
 * The state interface for the authentication feature.
*/
export interface State {
    auth: boolean; 
    user: User;
};

/**
 * The initial state for the authentication feature.
*/
export const initialState: State = {
   auth: false,
   user: {
    id: '',
    email: '',
    isNew: false,
   }
};


/**
 * The reducer function for handling authentication actions.
 * 
 * Uses the `createReducer` function to define how the state should change in response to different actions.
*/
const _userReducer = createReducer(initialState,
    on( auth, (state,{login}) => ({ ...state, auth: login  })),
    on( userData, (state, { user }) => ({ ...state, user: { ...user }  })),
);


/**
 * The reducer function to be used in the store.
 * 
 * Calls the internal reducer function with the current state and action.
 * 
 * @param state - The current state or undefined if it is the initial call
 * @param action - The action to process
 * @returns The new state after applying the action
*/
export function userReducer(state : State | undefined, action : Action ) {
    return _userReducer(state, action);
}