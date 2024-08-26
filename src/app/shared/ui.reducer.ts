import { createReducer, on , Action} from '@ngrx/store';
import { isLoading, stopLoading } from './ui.action';

export interface State {
    isLoading: boolean; 
};

export const initialState: State = {
   isLoading: false
};

const _uiReducer = createReducer(initialState,

    on( isLoading,   state => ({ ...state, isLoading: true  })),
    on( stopLoading, state => ({ ...state, isLoading: false })),
);

export function uiReducer(state : State | undefined, action : Action ) {
    return _uiReducer(state, action);
}