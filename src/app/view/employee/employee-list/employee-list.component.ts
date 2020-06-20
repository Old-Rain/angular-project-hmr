import { Component, OnInit } from '@angular/core'
import { EmployeeService } from '../employee.service'
import { HttpResponse } from '@angular/common/http'
import { NzMessageService } from 'ng-zorro-antd/message'

import { EmployeeList } from '../employee.type'

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
})
export class EmployeeListComponent implements OnInit {
  isLoading = false // 加载中
  employeeList: EmployeeList[] = []
  page = 1
  limit = 5
  total: number

  constructor(
    private employeeService: EmployeeService,
    private message: NzMessageService
  ) {}

  // trackBy
  employeeTrackById(index: number, item: EmployeeList) {
    return item.id
  }

  // 获取列表
  getEmployeeList() {
    this.isLoading = true
    this.employeeService
      .getEmployeeList(this.page, this.limit)
      .subscribe((res: HttpResponse<EmployeeList[]>) => {
        this.total = +res.headers.get('X-Total-Count') // 拿到total
        this.employeeList = [...res.body]
        this.isLoading = false
      })
  }

  // 确认删除
  delEnter(id) {
    console.log(id)
    this.employeeService.delEmployee(id).subscribe(
      () => {
        this.page = 1 // 每次操作后从第一页开始查询
        this.getEmployeeList()
      },
      () => this.message.create('warning', '删除失败')
    )
  }

  ngOnInit(): void {
    this.getEmployeeList()
  }
}
