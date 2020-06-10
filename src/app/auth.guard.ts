/**
 * 路由守卫
 * CanActive 处理导航到某路由的情况
 * CanActiveChild 处理导航到某子路由的情况
 * CanDeactive 处理从当前路由离开的情况
 * Resolve 路由激活之前获取路由数据
 * CanLoad 处理异步导航到某特性模块的情况
 */

import { Injectable } from '@angular/core'
import { CanActivate, Router } from '@angular/router'

// 路由守卫本身是一个服务，需要在模块中注册
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    console.log('要想从这过')

    const token = sessionStorage.getItem('token')

    // 通过
    if (!!token) {
      return true
    }

    // 不通过
    this.router.navigate(['/login'])
    return false
  }
}
