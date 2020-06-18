import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

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
}
