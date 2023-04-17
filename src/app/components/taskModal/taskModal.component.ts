import { Component, HostBinding } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'task-modal',
  templateUrl: './taskModal.component.html',
})
export class TaskModalComponent {
  @HostBinding('class') classes = 'task-modal';

  constructor(
    public modalService: ModalService
  ){}
}