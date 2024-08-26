/**
 * Represents a task with details such as title, description, date, and completion status.
*/
export interface Task {
    id: string
    createdAt?: CreatedAt
    description: string
    task_date: string
    completed?: boolean
    title: string
    userId: string
  }
  
/**
 * Represents the creation timestamp of a task with seconds and nanoseconds.
 */
  export interface CreatedAt {
    _seconds: number
    _nanoseconds: number
  }

 /**
 * Represents the data required to create a new task.
 */
  export interface TaskCreate {
    title: string;
    description: string;
    task_date: string;
  }

 /**
 * Represents the data required to update an existing task.
 */
  export interface TaskUpdate {
    title: string;
    description: string;
    task_date: string;
    completed: boolean;
  }