import { createAction, props } from '@ngrx/store';
import { Task } from './models/todo.model';

/**
 * Action to set or update a specific task in the application state.
 * This action is dispatched when a particular task needs to be set or updated,
 * such as during task selection or editing.
 */
export const setTask = createAction('[TASK Component] task',
    props<{ task: Task }>()
);


/**
 * Action to populate or update the list of tasks in the application state.
 * This action is dispatched when a batch of tasks needs to be set or updated,
 * such as after fetching tasks from an API.
 *
 * Action Type: '[TASKS Component] task'
 */
export const fillTasks = createAction('[TASKS Component] task',
    props<{ tasks: Task[] }>()
);