/**
 * ng g m moduleName --routing // 创建带路由的模块
 */

import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { EmployeeListComponent } from './employee-list/employee-list.component'
import { EmployeeAddComponent } from './employee-add/employee-add.component'

const routes: Routes = [
  {
    path: '',
    component: EmployeeListComponent,
  },
  {
    path: 'employee-add',
    component: EmployeeAddComponent,
  },
]

@NgModule({
  // 子路由模块使用forChild
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeRoutingModule {}
