import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppRoutingModule } from './app-routing.module'
import { AuthGuard } from './auth.guard'
import { AppComponent } from './app.component'
import { NZ_I18N } from 'ng-zorro-antd/i18n'
import { zh_CN } from 'ng-zorro-antd/i18n'
import { registerLocaleData } from '@angular/common'
import zh from '@angular/common/locales/zh'

import { AntdModules } from './plugin/AntdModules'

import { HomeComponent } from './view/home/home.component'
import { LoginComponent } from './view/login/login.component'

registerLocaleData(zh)

@NgModule({
  declarations: [AppComponent, HomeComponent, LoginComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ...AntdModules,
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }, AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
