import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, combineLatest, filter, map, Observable, Subject, takeUntil } from 'rxjs';
import { BoardInterface } from 'src/app/models/board.interface';
import { ColumnInterface } from 'src/app/models/column.interface';
import { ColumnInputInterface } from 'src/app/models/columnInput.interface';
import { TaskInterface } from 'src/app/models/task.interface';
import { TaskInputInterface } from 'src/app/models/taskInput.interface';
import { BoardsService } from 'src/app/services/boards.service';
import { ColumnsService } from 'src/app/services/columns.service';
import { ModalService } from 'src/app/services/modal.service';
import { OneBoardService } from 'src/app/services/one-board.service';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
})
export class BoardComponent implements OnInit, OnDestroy {
  boardId: string;

  BOARD_NAME = 'Board ';

  data$: Observable<{
    board: BoardInterface;
    columns: ColumnInterface[];
    tasks: TaskInterface[];
  }>;

  task$: Observable<TaskInterface>;
  column$: Observable<ColumnInterface>;
  editedData$: Observable<{
    task: TaskInterface;
    column: ColumnInterface;
  }>;

  currentColumnId$ = new BehaviorSubject<string>('');
  setCurrennColumnId(currentColumnId: string) {
      this.currentColumnId$.next(currentColumnId);
  }

  currentTaskId = '';
  currentColumnId = '';

  unsubscribe$ = new Subject<void>();

  constructor(
    private boardsService: BoardsService,
    private route: ActivatedRoute,
    private oneBoardService: OneBoardService,
    private columnsService: ColumnsService,
    private taskService: TasksService,
    private router: Router,
    public modalService: ModalService
  ){
    const boardId = this.route.snapshot.paramMap.get('boardId');

    if(!boardId) {
      throw Error('There is not boardId from URL!');
      alert(Error('There is not boardId from URL!'));
    }
    this.boardId = boardId;
    this.data$ = combineLatest([
      this.oneBoardService.board$.pipe(filter(Boolean)),
      this.oneBoardService.columns$,
      this.oneBoardService.tasks$
    ]).pipe(
      map(([board, columns, tasks]) => ({
        board,
        columns,
        tasks
      }))
    );

    this.task$ = this.oneBoardService.tasks$.pipe(
      map((tasks) => {
        return tasks.find((task) => task._id === this.currentTaskId);
      }),
      filter(Boolean)
    );

    this.column$ = this.oneBoardService.columns$.pipe(
      map((columns) => {
        return columns.find((column) => column._id === this.currentTaskId);
      }),
      filter(Boolean)
    );

    this.editedData$ = combineLatest([this.task$, this.column$]).pipe(
      map(([task, column]) => ({
        task,
        column
      }))
    );

  }

  ngOnInit(): void {
    this.fetchData();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  fetchData() {
    this.boardsService.getBoard(this.boardId)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe((board) => {
      this.oneBoardService.setBoard(board);
    });

    this.columnsService.getColumns(this.boardId)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe((columns) => {
      this.oneBoardService.setColumns(columns);
    });

    this.taskService.getTasks(this.boardId)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe((tasks) => {
      this.oneBoardService.setTasks(tasks);
    });
  }

  createColumn(title: string) {
    const columnInput: ColumnInputInterface = {
      title,
      boardId: this.boardId,
      order: 3
    };
    this.columnsService.createColumn(columnInput)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(() => {
      this.modalService.close();
    });

    this.fetchData();
  }

  createTask(title: string, columnId: string) {
    const taskInput: TaskInputInterface = {
      title,
      order: 3,
      description: 'description 1',
      userId: 23,
      users: [],
    };

    this.taskService.createTask(taskInput, this.boardId, columnId)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe((task) => {
      this.modalService.closeCreateTask();
      this.oneBoardService.addTask(task);
    });
  }

  getTasksByColumn(columnId: string, tasks: TaskInterface[]): TaskInterface[] {
    return tasks.filter((task) => task.columnId === columnId);
  }

  updateBoardName(title: string) {
    this.boardsService.updateBoard(this.boardId, title)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe((updatedBoard) => {
      this.oneBoardService.updateBoard(updatedBoard);
    });
  }

  updateColumnName(columnName: string, columnId: string) {

    this.columnsService.updateColumn(this.boardId, columnId, columnName)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe((updatedColumn) => {
      this.oneBoardService.updateColumn(updatedColumn);
    });
  }

  updateTaskName(title: string, columnId: string, taskId: string) {
    const taskInput: TaskInputInterface = {
      title: title,
      order: 3,
      description: 'description 1',
      userId: 23,
      users: [localStorage.getItem('user-id')],
    };

    this.taskService.updateTask(taskInput, this.boardId, columnId, taskId)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe((task) => {
      this.oneBoardService.updateTask(task);
      this.modalService.closeUpdateTask();

      this.fetchData();
    });
  }

  deleteBoard() {
    if(confirm('Are you sure you want to delete this board?')) {
      this.boardsService.deleteBoard(this.boardId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.router.navigate(['/main-route']);
      });
    }
  }

  deleteColumn(columnId: string) {
    if(confirm('Are you sure you want to delete this column?')) {
      this.columnsService.deleteColumn(this.boardId, columnId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.oneBoardService.deleteColumn(columnId);
      });
    }
  }

  deleteTask(taskId: string, columnId: string) {
    if(confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(this.boardId, columnId, taskId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.oneBoardService.deleteTask(taskId);
      });
    }
  }

  setCurrentTaskId(currentTaskId: string) {
    this.currentTaskId = currentTaskId;

    this.task$ = this.oneBoardService.tasks$.pipe(
      map((tasks) => {
        return tasks.find((task) => task._id === this.currentTaskId);
      }),
      filter(Boolean)
    );

    this.editedData$ = combineLatest([this.task$, this.column$]).pipe(
      map(([task, column]) => ({
        task,
        column
      }))
    );

  }

  setCurrentColumnId(currentColumnId: string) {
    this.currentColumnId = currentColumnId;

    this.column$ = this.oneBoardService.columns$.pipe(
      map((columns) => {
        return columns.find((column) => column._id === this.currentColumnId);
      }),
      filter(Boolean)
    );

    this.editedData$ = combineLatest([this.task$, this.column$]).pipe(
      map(([task, column]) => ({
        task,
        column
      }))
    );
  }
}
