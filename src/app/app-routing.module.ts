import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { AuthGuard } from './auth.guard'

import { LoginComponent } from './view/login/login.component'
import { HomeComponent } from './view/home/home.component'

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard], // 路由守卫
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],

  // 路由出口router-outlet由RouterModule提供，所以要在路由模块中将其导出
  exports: [RouterModule],
})
export class AppRoutingModule {}
