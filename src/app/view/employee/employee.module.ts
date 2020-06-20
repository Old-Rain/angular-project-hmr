import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'

// 组件由模块管理，所以子组件的模块要在父组件模块中注册
import { AntdModules } from './employee.plugin'

import { EmployeeRoutingModule } from './employee-routing.module'
import { EmployeeService } from './employee.service'

import { EmployeeAddComponent } from './employee-add/employee-add.component'
import { EmployeeListComponent } from './employee-list/employee-list.component'

@NgModule({
  declarations: [EmployeeAddComponent, EmployeeListComponent],
  providers: [EmployeeService],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EmployeeRoutingModule,
    ...AntdModules,
  ],
})
export class EmployeeModule {}
