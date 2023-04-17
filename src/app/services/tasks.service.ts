import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { TaskInterface } from "../models/task.interface";
import { TaskInputInterface } from "../models/taskInput.interface";

@Injectable()
export class TasksService {
    constructor(private http: HttpClient) {}

    getTasks(boardId: string): Observable<TaskInterface[]> {
        return this.http.get<TaskInterface[]>(`${environment.apiUrl}/tasksSet/${boardId}`);
    }

    createTask(taskInput: TaskInputInterface, boardId: string, columnId: string ): Observable<TaskInterface> {
        return this.http.post<TaskInterface>(`${environment.apiUrl}/boards/${boardId}/columns/${columnId}/tasks`, {
          "title": taskInput.title,
          "order": taskInput.order,
          "description": taskInput.description,
          "userId": taskInput.userId,
          "users": taskInput.users
        });
    }

    updateTask(taskInput: TaskInputInterface, boardId: string, columnId: string, taskId: string): Observable<TaskInterface> {
        return this.http.put<TaskInterface>(`${environment.apiUrl}/boards/${boardId}/columns/${columnId}/tasks/${taskId}`, {
            "title": taskInput.title,
            "order": taskInput.order,
            "description": taskInput.description,
            "userId": taskInput.userId,
            "users": taskInput.users,
            "columnId": columnId
        });
    }

    deleteTask(boardId: string, columnId: string, taskId: string ) {
        return this.http.delete(`${environment.apiUrl}/boards/${boardId}/columns/${columnId}/tasks/${taskId}`);
    }
}
