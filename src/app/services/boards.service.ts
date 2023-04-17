import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BoardInterface } from '../models/board.interface';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class BoardsService {

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) {}

  getBoards(): Observable<BoardInterface[]>{
    return this.http.get<BoardInterface[]>(`${environment.apiUrl}/boards`);
  }

  getBoard(boardId: string): Observable<BoardInterface> {
    return this.http.get<BoardInterface>(`${environment.apiUrl}/boards/${boardId}`);
  }

  createBoard(title: string): Observable<BoardInterface> {
    return this.http.post<BoardInterface>(`${environment.apiUrl}/boards`, {
      "title": title,
      "owner": localStorage.getItem('user-id'),
      "users": [
        localStorage.getItem('user-id')
      ]
    });
  }

  updateBoard(boardId: string, title: string): Observable<BoardInterface>{
    return this.http.put<BoardInterface>(`${environment.apiUrl}/boards/${boardId}`, {
      "title": title,
      "owner": localStorage.getItem('user-id'),
      "users": [
        localStorage.getItem('user-id')
      ]
    });
  }

  deleteBoard(boardId: string) {
    return this.http.delete(`${environment.apiUrl}/boards/${boardId}`);
  }
}
