import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

const baseURL = 'http://localhost:2080'

@Injectable()
export class EmployeeService {
  token = sessionStorage.getItem('token')

  constructor(private http: HttpClient) {}

  getEmployeeList(page: number, limit: number) {
    return this.http.get(`${baseURL}/employees?_page=${page}&_limit=${limit}`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
      observe: 'response',
    })
  }
}
