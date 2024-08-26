import { isDevMode } from '@angular/core';
import * as ui from '../shared/ui.reducer';
import * as user from '../auth/auth.reducer';
import * as todo from '../todos/todo.reducer';

import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';

/**
 * Interface representing the application's state structure.
*/
export interface AppState {
  ui: ui.State,
  user: user.State,
  todo: todo.State
}


/**
 * Maps the state properties to their corresponding reducers.
*/
export const appReducers: ActionReducerMap<AppState> = {
  ui: ui.uiReducer,
  user: user.userReducer,
  todo: todo.todoReducer
};

/**
 * List of meta-reducers to apply to the state.
 * Empty array in development mode.
 * Can include meta-reducers for logging, state preservation, etc.
 */
export const metaReducers: MetaReducer<AppState>[] = isDevMode() ? [] : [];
