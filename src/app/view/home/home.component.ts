import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { NzMessageService } from 'ng-zorro-antd/message'

import { HomeService } from './home.service'

/**
 * routerLink可以在任意标签上使用，达到声明式导航的效果
 */

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [NzMessageService, HomeService],
})
export class HomeComponent implements OnInit {
  constructor(
    private router: Router,
    private homeService: HomeService,
    private message: NzMessageService
  ) {}

  confirm() {
    this.homeService.exit().subscribe(
      () => {
        this.message.create('success', '退出成功')
        sessionStorage.removeItem('token')
        this.router.navigate(['/login'])
      },
      () => {
        this.message.create('warning', '退出失败')
      }
    )
  }

  ngOnInit(): void {}
}
