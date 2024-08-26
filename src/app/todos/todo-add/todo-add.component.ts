import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TodoService } from '../services/todo.service';
import { Task, TaskCreate, TaskUpdate } from '../models/todo.model';
import moment from 'moment';
import { AppState } from '@app/reducers';
import { Store } from '@ngrx/store';
import { fillTasks, setTask } from '../todo.action';
import { taskInitialState } from '../todo.reducer';
import { NotificationService } from '@app/shared/services/notification.service';
import { isLoading, stopLoading } from '@app/shared/ui.action';

/**
 * Component for adding and editing tasks.
 * Handles form submission, task creation, and task updates.
*/

@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrl: './todo-add.component.scss'
})
export class TodoAddComponent {

  todoForm: FormGroup = this.fb.group({});
  id:string = '';
  _task: TaskUpdate = {
    title: '',
    description: '',
    task_date: '',
    completed: false
  };

  todoSubscription: Subscription = new Subscription();

  constructor(
    private todoService: TodoService, 
    private fb: FormBuilder,  
    private store: Store<AppState>,
    private notificationService: NotificationService) { }


  /**
   * Initializes the component.
   * Subscribes to the store to get the current task if editing,
   * and sets form data if a task exists.
   */
  ngOnInit(): void {
    this.todoForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(10)]],
      date: ['', Validators.required],
      time: ['', [Validators.required, Validators.max(2400)]],
      description: ['', [Validators.required, Validators.minLength(15)]]
    });

    this.todoSubscription = this.store.select('todo')
      .subscribe( todo => {
        if(todo.task.id){
          this._task = todo.task as TaskUpdate;
          this.id = todo.task.id;
          this.setData();
        }
      });
  }

  /**
   * Handles form submission.
   * Creates a new task if no id is present or updates the existing task.
  */
  onSubmit(): void {
    if(this.id){
      this.update();
      return;
    }
    if (this.todoForm.valid) {
      this.store.dispatch(isLoading());
      const dataform = this.todoForm.value;
      const date = moment(dataform.date).format('YYYY-MM-DD')+' '+dataform.time.slice(0, 2) + ':' + dataform.time.slice(2);
      const data : TaskCreate = {
        title: dataform.title,
        description: dataform.description,
        task_date: date
      };
      this.todoService.create(data).subscribe({
        next: () => {
          this.store.dispatch(stopLoading());
          this.getAll();
          this.cancel();
          this.notificationService.showSuccess('Taréa agreada con éxito');
        },
        error: (error: Error) => {
          this.store.dispatch(stopLoading());
          // Manejo del error
          this.notificationService.showError('No se pudo agregar taréa '+error.message);
        }
      });
    }
  }

  /**
   * Sets the form values to the task data when editing.
  */
  setData():void {
    this.todoForm.get('title')?.setValue(this._task.title);
    this.todoForm.get('description')?.setValue(this._task.description);
    const date = new Date(this._task.task_date);
    let time = this._task.task_date.split(' ')[1]; // "18:00"
    time= time.replace(':', ''); // "1800"
    this.todoForm.get('date')?.setValue(date);
    this.todoForm.get('time')?.setValue(time);
  }


  /**
   * Updates the existing task.
   * Sends the updated task data to the server.
  */
  update(): void {
    if (this.todoForm.valid) {
      this.store.dispatch(isLoading());
      const dataform = this.todoForm.value;
      const date = moment(dataform.date).format('YYYY-MM-DD')+' '+dataform.time.slice(0, 2) + ':' + dataform.time.slice(2);
      const data : TaskUpdate = {
        title: dataform.title,
        description: dataform.description,
        task_date: date,
        completed: this._task.completed
      };
      this.todoService.update(this.id, data).subscribe({
        next: () => {
          this.store.dispatch(stopLoading());
          this.getAll();
          this.store.dispatch(setTask({task: taskInitialState}));
          this.cancel();
          this.notificationService.showSuccess('Taréa actualizada con éxito');
        },
        error: (error: Error) => {
          // Manejo del error
          this.notificationService.showError('No se pudo actualizar la taréa '+error.message);
        }
      });
    }

  }

  /**
   * Fetches all tasks from the server and updates the store.
  */
  getAll(): void {
    this.todoService.getall().subscribe({
      next: (response:Task[]) => {
        this.store.dispatch(fillTasks({tasks: response}));
      },
      error: (error: Error) => {
        // Manejo del error
        this.notificationService.showError('Error al obtener las tareas '+error.message);
      }
    });
  }

  /**
   * Resets the form and clears the task id.
  */
  cancel(): void {
    this.id = '';
    this.todoForm.reset();
  }

  /**
   * Cleans up subscriptions when the component is destroyed.
  */
  ngOnDestroy(): void {
    //destroy subscription
    this.todoSubscription.unsubscribe();  
  }
}
