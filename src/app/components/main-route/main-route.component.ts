import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { BoardInterface } from 'src/app/models/board.interface';
import { AuthService } from 'src/app/services/auth.service';
import { BoardsService } from 'src/app/services/boards.service';

@Component({
  selector: 'app-main-route',
  templateUrl: './main-route.component.html',
  styleUrls: ['./main-route.component.scss']
})
export class MainRouteComponent implements OnInit, OnDestroy {
  boards: BoardInterface[] = [];

  unsubscribe$ = new Subject<void>();

  constructor(
    private boardsService: BoardsService,
    private auth: AuthService,
    private router: Router

  ) {}

  ngOnInit(): void {
    this.boardsService.getBoards().subscribe( boards => {
      this.boards = boards;
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  createBoard(title: string) {
    this.boardsService.createBoard(title).subscribe((createdBoard) => {
      this.boards = [...this.boards, createdBoard];
    });
  }

  deleteBoard(boardId: string) {
    if(confirm('Are you sure you want to delete this board?')) {
      this.boardsService.deleteBoard(boardId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.boardsService.getBoards().subscribe( boards => {
          this.boards = boards;
        });
      });
    }
  }
}
