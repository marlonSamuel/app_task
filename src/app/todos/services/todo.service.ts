import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@environments/enviroment';
import { Observable } from 'rxjs';
import { Task, TaskCreate, TaskUpdate } from '../models/todo.model';


/**
 * Service for interacting with the tasks API.
 * Provides methods to perform CRUD operations on tasks.
 */
@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private apiUrl = environment.apiUrl+'/tasks';

  constructor(private http: HttpClient, private router: Router) { }

  /**
   * Fetches all tasks from the API.
   * Optionally filters tasks based on their completion status.
   * @param completed - Optional boolean to filter tasks by their completion status
   * @returns An Observable of an array of Task objects
   */
  getall(completed: boolean | undefined = undefined): Observable<Task[]> {
    let query = '';
    if(completed !== undefined){
      query = '?completed='+completed;
    }
    return this.http.get<Task[]>(this.apiUrl+'/get-by-user'+query);
  }

  /**
   * Creates a new task.
   * @param data - TaskCreate object containing the details of the new task
   * @returns An Observable of the created Task object
   */
  create(data: TaskCreate): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, data);
  }

  /**
   * Updates an existing task.
   * @param id - ID of the task to update
   * @param data - TaskUpdate object containing the updated details of the task
   * @returns An Observable of the updated TaskUpdate object
   */
  update(id: string, data: TaskUpdate): Observable<TaskUpdate> {
    return this.http.put<TaskUpdate>(this.apiUrl+'/'+id, data);
  }

  /**
   * Deletes a task.
   * @param id - ID of the task to delete
   * @returns An Observable of a boolean indicating success or failure
   */
  delete(id: string): Observable<Boolean> {
    return this.http.delete<Boolean>(this.apiUrl+'/'+id);
  }

}
