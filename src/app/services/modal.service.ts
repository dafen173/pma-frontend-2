import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  isVisible$ = new BehaviorSubject<boolean>(false);
  open() {
    this.isVisible$.next(true);
  }
  close() {
    this.isVisible$.next(false);
  }

  addTaskBtnIsVisible$ = new BehaviorSubject<boolean>(false);
  openCreateTask() {
    this.addTaskBtnIsVisible$.next(true);
  }
  closeCreateTask() {
    this.addTaskBtnIsVisible$.next(false);
  }

  updateTaskFormIsVisible$ = new BehaviorSubject<boolean>(false);
  openUpdateTask() {
    this.updateTaskFormIsVisible$.next(true);
  }
  closeUpdateTask() {
    this.updateTaskFormIsVisible$.next(false);
  }
}
