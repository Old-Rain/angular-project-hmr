import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { LoginParams } from './login.type'

const baseURL = 'http://localhost:2080'

@Injectable()
export class LoginService {
  constructor(private http: HttpClient) {}

  // 登录
  login(params: LoginParams) {
    return this.http.post(`${baseURL}/tokens`, params, {
      headers: { NoAuthorization: '1' },
    })
  }
}
