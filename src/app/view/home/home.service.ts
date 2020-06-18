import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

const baseURL = 'http://localhost:2080'

@Injectable()
export class HomeService {
  constructor(private http: HttpClient) {}

  exit() {
    // const token = sessionStorage.getItem('token')
    return this.http.delete(`${baseURL}/tokens`, {
      // headers: { Authorization: `Bearer ${token}` },
    })
  }
}
