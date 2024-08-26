import { Component, computed, inject, signal, ViewChild } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Task, TaskUpdate } from '../models/todo.model';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '@app/reducers';
import { fillTasks, setTask } from '../todo.action';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { NotificationService } from '@app/shared/services/notification.service';
import { isLoading, stopLoading } from '@app/shared/ui.action';


/**
 * Component for displaying and managing a list of tasks.
 * Handles task pagination, completion, deletion, and updates.
*/
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent {
  readonly dialog = inject(MatDialog);
  
  list: Task[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  todoSubscription: Subscription = new Subscription();
  
  paginatedTasks: Task[] = [];
  pageSize = 5;

  breakpoint = 3;

  constructor(
    private todoService: TodoService, 
    private store: Store<AppState>, 
    private notificationService: NotificationService){};

  /**
   * Initializes the component after the view has been initialized.
   * Sets up pagination and subscribes to the store to get tasks.
  */
  ngAfterViewInit(): void {
    this.paginator.page.subscribe(() => this.updatePaginatedTasks());
  }
  

  /**
   * Initializes the component and fetches tasks from the store.
   * Configures responsive grid layout based on window size.
  */
  ngOnInit(): void {
    this.onResize();

    this.todoSubscription = this.store.select('todo')
        .subscribe( todo => {
          console.log('subscrito a tasks, ', todo);
          this.list = todo.tasks;
          if(this.paginator) {
            this.paginator.pageIndex = 0; // Reset to the first page
            this.paginator.pageSize = 5; // Reset page size if necessary
            this.updatePaginatedTasks();
        }
          
    });
  }


  /**
   * Adjusts the number of columns in a grid based on window size.
   */
  onResize() {
    const size = window.innerWidth;
    console.log(size);
    if(size <= 900){
      this.breakpoint = 1;

    }else if(size <= 1400){
      this.breakpoint = 2;
    }else{
      this.breakpoint = 3;
    }
  }

    /**
   * Fetches tasks with a specified completion status from the service.
   * Updates the store with the fetched tasks and handles loading states.
   * @param completed Boolean indicating whether to filter by completed status
   */
  getAll(completed: boolean): void {
    this.store.dispatch(isLoading());
    this.todoService.getall(completed).subscribe({
      next: (response:Task[]) => {
        this.store.dispatch(stopLoading());
        this.store.dispatch(fillTasks({tasks: response}));
      },
      error: (error: Error) => {
        this.store.dispatch(stopLoading());
        // Manejo del error
        this.notificationService.showError('Error al obtener las tareas '+error.message);
      }
    });
  }

  /**
   * Updates the list of tasks displayed on the current page.
  */
  updatePaginatedTasks(): void {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    const endIndex = startIndex + this.paginator.pageSize;
    console.log(startIndex, endIndex);
    this.paginatedTasks = this.list.slice(startIndex, endIndex);
  }

  /**
   * check status of task as completed
   * @param task The task to be updated
  */
  completeTask(task: Task): void {
    const data : TaskUpdate = {
      title: task.title,
      description: task.description,
      task_date: task.task_date,
      completed: !task.completed
    };

    this.store.dispatch(isLoading());
    this.todoService.update(task.id,data).subscribe({
      next: () => {
        this.store.dispatch(stopLoading());
        this.getAll(task.completed!);
        this.notificationService.showSuccess('Taréa '+(data.completed ? 'Completada ' : 'Marcada como pendiente ')+' con éxito');
      },
      error: (error: Error) => {
        this.store.dispatch(stopLoading());
        // Manejo del error
        this.notificationService.showError('No se pudo '+(data.completed ? 'Completar ' : 'Marcar como pendiente ')+error.message);
      }
    });
  }

  /**
   * Shows a confirmation dialog before deleting a task.
   * @param task The task to be deleted
  */
  confirmDelete(task: Task): void {
      Swal.fire({
        title: '¿Estás seguro de eliminar taréa '+task.title+'?',
        text: '¡No podrás revertir esto!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '¡Sí, bórralo!'
      }).then((result) => {
        if (result.isConfirmed) {
          // Swal.fire('¡Eliminado!', 'Tu archivo ha sido eliminado.', 'success');
          this.deleteTask(task);
        }
      });
  }

  /**
   * Deletes a task from the server and updates the task list.
   * @param task The task to be deleted
  */
  deleteTask(task: Task): void {
    this.store.dispatch(isLoading());
    this.todoService.delete(task.id).subscribe({
      next: () => {
        this.store.dispatch(stopLoading());
        this.notificationService.showSuccess('Taréa eliminada con éxito');
        this.getAll(task.completed!);
      },
      error: (error: Error) => {
        this.store.dispatch(stopLoading());
        // Manejo del error
        this.notificationService.showError('No se pudo elminar taréa '+error.message);
      }
    });
  }

  /**
   * Sets the task to be edited in the store.
   * @param task The task to be updated
  */
  updateTask(task: Task): void {
    this.store.dispatch(setTask({task: task}));
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
