import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ColumnInterface } from "../models/column.interface";
import { ColumnInputInterface } from "../models/columnInput.interface";

@Injectable()
export class ColumnsService {
    constructor(private http: HttpClient) {}

    getColumns(boardId: string): Observable<ColumnInterface[]> {
        return this.http.get<ColumnInterface[]>(`${environment.apiUrl}/boards/${boardId}/columns`);
    }

    createColumn(columnInput: ColumnInputInterface): Observable<ColumnInterface> {
        return this.http.post<ColumnInterface>(`${environment.apiUrl}/boards/${columnInput.boardId}/columns`, {
          "title": columnInput.title,
          "order": columnInput.order
        });
    }

    updateColumn(boardId: string, columnId: string, title: string): Observable<ColumnInterface> {
        return this.http.put<ColumnInterface>(`${environment.apiUrl}/boards/${boardId}/columns/${columnId}`, {
            "title": title,
            "order": 3
        });
    }

    deleteColumn(boardId: string, columnId: string ) {
        return this.http.delete(`${environment.apiUrl}/boards/${boardId}/columns/${columnId}`);
    }
}


