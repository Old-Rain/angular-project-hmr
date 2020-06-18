/**
 * 请求拦截器
 *
 * 然后在根模块app.module中注册服务
 */

import { Injectable } from '@angular/core'
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http'
import { Router } from '@angular/router'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'

import { NzMessageService } from 'ng-zorro-antd/message'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router, private message: NzMessageService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // console.log(req)
    // console.log(next)

    // console.log(req.headers.get('NoAuthorization'))
    // 登录不需要添加请求头
    if (req.headers.get('NoAuthorization')) return next.handle(req)

    const token = sessionStorage.getItem('token')

    // req的属性受到readonly保护，修改请求参数只能在clone的同时赋予新值
    const _req = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    })

    // console.log(_req)

    // 使用管道符结合tap来捕获错误
    return next.handle(_req).pipe(
      tap(
        // 成功的回调
        () => {},

        // 失败的回调
        (err) => {
          // console.log(err)

          if (err.status === 401) {
            this.message.create('error', '身份验证失败，请重新登录')
            this.router.navigate(['/login'])
          }
        }
      )
    )
  }
}
