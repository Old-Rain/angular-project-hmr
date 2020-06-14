import { Component, OnInit } from '@angular/core'
import { EmployeeService } from '../employee.service'
import { HttpResponse } from '@angular/common/http'

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
  limit = 2
  total: number

  constructor(private employeeService: EmployeeService) {}

  employeeTrackById(index: number, item: EmployeeList) {
    return item.id
  }

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

  ngOnInit(): void {
    this.getEmployeeList()
  }
}
