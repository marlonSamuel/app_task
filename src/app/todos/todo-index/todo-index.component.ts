import { Component } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Task } from '../models/todo.model';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '@app/reducers';
import { fillTasks } from '../todo.action';
import { isLoading, stopLoading } from '@app/shared/ui.action';


/**
 * Component for displaying the list of tasks.
 * Fetches tasks from the server and manages loading state.
*/
@Component({
  selector: 'app-todo-index',
  templateUrl: './todo-index.component.html',
  styleUrl: './todo-index.component.css'
})
export class TodoIndexComponent {

  todoSubscription : Subscription = new Subscription();
  loading = false;

  constructor(private todoService: TodoService, private store: Store<AppState>){};


  /**
   * Initializes the component. Called after the constructor and the first call to ngOnChanges.
   * Subscribes to the UI state to manage loading indicators and fetches all tasks.
   */
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.todoSubscription = this.store.select('ui')
        .subscribe( ui => {
          this.loading = ui.isLoading;
    });

    this.getAll();
  }

  /**
   * Fetches all tasks from the TodoService and updates the state in the store.
   * Manages loading state using NgRx actions.
  */
  getAll():void {
    this.store.dispatch(isLoading());
    this.todoService.getall().subscribe({
      next: (response:Task[]) => {
        this.store.dispatch(stopLoading());
        this.store.dispatch(fillTasks({tasks: response}));
      },
      error: (error: Error) => {
        this.store.dispatch(stopLoading());
        // Manejo del error
        console.log(error);
      }
    });
  }

  /**
   * Cleans up subscriptions when the component is destroyed.
  */
  ngOnDestroy(): void {
    //destroy subscription
    this.todoSubscription.unsubscribe();
    
  }
}
