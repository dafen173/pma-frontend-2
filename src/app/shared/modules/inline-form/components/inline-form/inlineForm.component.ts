import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-inline-form',
  templateUrl: './inlineForm.component.html'
})
export class InlineFormComponent {
  @Input() title = '';
  @Input() defaultText = 'Not defined';
  @Input() hasButton = false;
  @Input() buttonText = 'Submit';
  @Input() inputPlaceholder = '';
  @Input() inputType = 'input';
  @Input() hasCancelButton = false;
  @Input() cancelButtonText = 'Cancel';
  @Input() hasOutsideSubmitButton = false;
  @Input() outsideSubmitButtonText = 'Submit';
  @Input() hasTextArea = false;
  @Input() inputTextPlaceholder = '';

  @Output() handleSubmit = new EventEmitter<string>();

  isEditing = false;
  form = this.fb.group({
    title: ['']
  });

  constructor(
    private fb: FormBuilder
  ) {}

  activeEditing() {
    if(this.title) {
      this.form.patchValue({title: this.title});
    }

    this.isEditing = true;
  }

  onSubmit() {
    if(this.form.value.title) {
      this.handleSubmit.emit(this.form.value.title);
    }

    this.isEditing = false;
    this.form.reset();
  }

  onCancel() {
    this.isEditing = false;
    this.form.reset();
  }
}
