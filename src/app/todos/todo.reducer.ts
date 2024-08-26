import { createReducer, on , Action} from '@ngrx/store';
import { Task } from './models/todo.model';
import { fillTasks, setTask } from './todo.action';


/**
 * The shape of the state managed by the Todo reducer.
 * 
 * State Structure:
 * - `task`: The currently selected or active task.
 * - `tasks`: The list of all tasks.
 */
export interface State {
    task: Task; 
    tasks: Task[];
};

/**
 * The initial state for a single task.
 * This state is used as the default value for the `task` property in the State.
 */
export const taskInitialState : Task = {
    id: '',
    title: '',
    description: '',
    task_date: '',
    userId: '',
    created_date: ''
};

/**
 * The initial state of the Todo feature.
 * This state is used as the default value for the entire State.
*/
export const initialState: State = {
   task: taskInitialState,
   tasks: []
};


/**
 * The reducer function for handling actions related to tasks.
 * It updates the state based on the dispatched actions.
 * 
 * - `setTask`: Updates the `task` property with the provided task.
 * - `fillTasks`: Updates the `tasks` property with the provided list of tasks.
 */
const _todoReducer = createReducer(initialState,
    on( setTask, (state,{task}) => ({ ...state, task: {...task}  })),
    on( fillTasks, (state, { tasks }) => ({ ...state, tasks: [...tasks] })),
);

/**
 * The function to call the reducer with the current state and action.
 * It delegates to `_todoReducer` to handle the state updates.
 * 
 * @param state - The current state or undefined.
 * @param action - The action to be processed.
 * @returns The new state after applying the action.
 */
export function todoReducer(state : State | undefined, action : Action ) {
    return _todoReducer(state, action);
}