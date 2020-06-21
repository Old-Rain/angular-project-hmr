import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { Employee, EmployeeList } from './employee.type'

const baseURL = 'http://localhost:2080'

@Injectable()
export class EmployeeService {
  constructor(private http: HttpClient) {}

  // 获取列表
  getEmployeeList(page: number, limit: number) {
    // const token = sessionStorage.getItem('token')
    return this.http.get(`${baseURL}/employees?_page=${page}&_limit=${limit}`, {
      // headers: { Authorization: `Bearer ${token}` },
      observe: 'response',
    })
  }

  // 删除
  delEmployee(id: number) {
    return this.http.delete(`${baseURL}/employees/${id}`)
  }

  // 添加
  addEmployee(params: Employee) {
    return this.http.post(`${baseURL}/employees`, params)
  }

  // 获取单个员工信息
  getEmployeeInfo(id: number) {
    return this.http.get(`${baseURL}/employees/${id}`)
  }

  // 修改员工信息
  modifyEmployeeInfo(id: number, params: EmployeeList) {
    return this.http.patch(`${baseURL}/employees/${id}`, params)
  }
}
