import { Component } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { TodoService } from '../services/todo.service';
import { AppState } from '@app/reducers';
import { Store } from '@ngrx/store';
import { NotificationService } from '@app/shared/services/notification.service';
import { Subscription } from 'rxjs';
import { isLoading, stopLoading } from '@app/shared/ui.action';
import { Task } from '../models/todo.model';
import { fillTasks } from '../todo.action';

/**
 * Component for filtering and displaying tasks based on their status (All, Pending, Completed).
 * Handles tab changes to fetch and display tasks accordingly.
 */
@Component({
  selector: 'app-todo-filter',
  templateUrl: './todo-filter.component.html',
  styleUrl: './todo-filter.component.css'
})


export class TodoFilterComponent {

  tabs = [
    {name: 'TODAS', value: undefined, icon: 'task'},
    {name: 'PENDIENTES', value: false, icon: 'pending_actions'},
    {name: 'COMPLETADAS', value: true, icon: 'check'}
  ];

  todoSubscription: Subscription = new Subscription();

  constructor(
    private todoService: TodoService, 
    private store: Store<AppState>, 
    private notificationService: NotificationService
  ){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
  }

  /**
   * Handles tab change events to filter tasks based on the selected tab.
   * Fetches tasks from the server based on the selected tab's value.
   * 
   * @param event The MatTabChangeEvent containing information about the selected tab.
  */
  onTabChange(event: MatTabChangeEvent): void {
    const index = event.index;
    const tabValue = this.tabs[index].value;
      this.store.dispatch(isLoading());

      this.todoService.getall(tabValue).subscribe({
        next: (response:Task[]) => {
          this.store.dispatch(stopLoading());
          this.store.dispatch(fillTasks({tasks: response}));
        },
        error: (error: Error) => {
          this.store.dispatch(stopLoading());
          this.notificationService.showError('Error al obtener las tareas '+error.message);
        }
      });

  }

  /**
   * Cleans up subscriptions when the component is destroyed.
  */
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.todoSubscription.unsubscribe();
  }

}
