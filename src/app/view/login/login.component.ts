import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'

import { LoginService } from './login.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [LoginService],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {}

  submitForm(): void {
    const {
      loginForm,
      loginForm: { controls, value, valid },
    } = this

    for (const k in controls) {
      if (controls.hasOwnProperty(k)) {
        controls[k].markAsDirty()
        controls[k].updateValueAndValidity()
      }
    }

    // 校验失败
    if (!valid) return

    // 校验成功 保存token并跳转到home页
    this.loginService.login(value).subscribe(
      (res: any) => {
        sessionStorage.setItem('token', res.token)
        this.router.navigate(['/home'])
      },
      (err) => console.log(err)
    )
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: [
        'zce',
        [Validators.required, Validators.minLength(2), Validators.maxLength(6)],
      ],
      password: [
        'wanglei',
        [Validators.required, Validators.pattern(/^\w{6,12}$/)],
      ],
    })
  }
}
