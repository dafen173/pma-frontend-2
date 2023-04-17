import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { BoardInterface } from "../models/board.interface";
import { ColumnInterface } from "../models/column.interface";
import { TaskInterface } from "../models/task.interface";

@Injectable()
export class OneBoardService {
    board$ = new BehaviorSubject<BoardInterface | null>(null);
    columns$ = new BehaviorSubject<ColumnInterface[]>([]);
    tasks$ = new BehaviorSubject<TaskInterface[]>([]);


    setBoard(board: BoardInterface) {
        this.board$.next(board);
    }

    setColumns(columns: ColumnInterface[]) {
        this.columns$.next(columns);
    }

    setTasks(tasks: TaskInterface[]) {
        this.tasks$.next(tasks);
    }

    updateBoard(updateBoard: BoardInterface) {
        const board = this.board$.getValue();
        if(!board) {
            throw new Error('There is no an initialized board!');
        }
        this.board$.next({...board, title: updateBoard.title});
    }

    updateColumn(updatedColumn: ColumnInterface) {
        const updatedColumns = this.columns$.getValue().map((column) => {
            if (column._id === updatedColumn._id) {
                return {...column, title: updatedColumn.title};
            }
            return column;
        });
        this.columns$.next(updatedColumns);
    }

    updateTask(updatedTask: TaskInterface) {
        const updatedTasks = this.tasks$.getValue().map((task) => {
            if (task._id === updatedTask._id) {
                return {...task, title: updatedTask.title};
            }
            return task;
        });
        this.columns$.next(updatedTasks);
    }

    addTask(task: TaskInterface): void {
        const updatedTasks = [...this.tasks$.getValue(), task];
        this.tasks$.next(updatedTasks);
    }

    deleteColumn(columnId: string) {
        const updatedColumns = this.columns$
            .getValue()
            .filter(column => column._id !== columnId);
        this.columns$.next(updatedColumns);
    }

    deleteTask(taskId: string) {
        const updatedTasks = this.tasks$
            .getValue()
            .filter(task => task._id !== taskId);
        this.tasks$.next(updatedTasks);
    }
}


