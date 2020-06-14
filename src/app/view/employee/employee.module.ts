import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

// 组件由模块管理，所以子组件的模块要在父组件模块中注册
import { AntdModules } from './employee.plugin'

import { EmployeeService } from './employee.service'

import { EmployeeRoutingModule } from './employee-routing.module'
import { EmployeeAddComponent } from './employee-add/employee-add.component'
import { EmployeeListComponent } from './employee-list/employee-list.component'

@NgModule({
  declarations: [EmployeeAddComponent, EmployeeListComponent],
  providers: [EmployeeService],
  imports: [CommonModule, EmployeeRoutingModule, ...AntdModules],
})
export class EmployeeModule {}
