import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { InlineFormComponent } from "./components/inline-form/inlineForm.component";
import { ModalFormComponent } from "./components/modal-form/modalForm.component";


@NgModule({
    imports: [CommonModule, ReactiveFormsModule],
    declarations: [InlineFormComponent, ModalFormComponent],
    exports: [InlineFormComponent, ModalFormComponent],
})
export class InlineFormModule {}
