import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BoardComponent } from "./board.component";
import { AuthGuard } from '../../classes/auth.guard';
import { OneBoardService } from "src/app/services/one-board.service";
import { ColumnsService } from "src/app/services/columns.service";
import { SiteLayoutComponent } from "../layouts/site-layout/site-layout.component";
import { InlineFormModule } from "src/app/shared/modules/inline-form/inlineForm.module";
import { TasksService } from "src/app/services/tasks.service";

const routes: Routes = [
    {
        path: '', component: SiteLayoutComponent, canActivate: [AuthGuard], children: [
            {
                path: 'boards/:boardId',
                component: BoardComponent,
            }
        ]
    }
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes), InlineFormModule],
    declarations: [BoardComponent],

    providers: [OneBoardService, ColumnsService, TasksService]
})
export class BoardModule {}
