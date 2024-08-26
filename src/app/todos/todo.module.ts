import {ChangeDetectionStrategy, Component} from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoAddComponent } from './todo-add/todo-add.component';
import { TodoFilterComponent } from './todo-filter/todo-filter.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoIndexComponent } from './todo-index/todo-index.component';
import { MaterialModule } from '@app/material.module';
import {provideNativeDateAdapter} from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIcon } from '@angular/material/icon';
import { IConfig, NgxMaskDirective, NgxMaskPipe, provideEnvironmentNgxMask } from 'ngx-mask';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadingSpinnerModule } from '@app/shared/loading/loading-spinner.module';
import { TodoRoutingModule } from './routing.module';

const maskConfigFunction: () => Partial<IConfig> = () => {
  return {
    validation: false,
  };
};

@NgModule({
  declarations: [
    TodoAddComponent,
    TodoFilterComponent,
    TodoListComponent,
    TodoIndexComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    MatDatepickerModule,
    MatIcon,
    NgxMaskDirective, NgxMaskPipe,
    ReactiveFormsModule,
    LoadingSpinnerModule,
    TodoRoutingModule
  ],
  exports: [
    TodoIndexComponent
  ],
  providers: [provideNativeDateAdapter(), provideEnvironmentNgxMask(maskConfigFunction)]
})
export class TodoModule { }
