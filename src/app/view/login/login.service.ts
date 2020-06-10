import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { LoginParams } from './login.type'

@Injectable()
export class LoginService {
  constructor(private http: HttpClient) {}

  login(params: LoginParams) {
    return this.http.post('http://localhost:2080/tokens', params)
  }
}
