import { Component, OnInit } from '@angular/core'
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms'
import { Router } from '@angular/router'

import { EmployeeService } from '../employee.service'
import { Employee } from '../employee.type'

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.scss'],
})
export class EmployeeAddComponent implements OnInit {
  employeeAddForm: FormGroup

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private employeeService: EmployeeService
  ) {}

  // 自定义日期验证，选中的日期不能大于今天
  dateValidate(date: AbstractControl) {
    const now = Date.now()
    if (+date.value <= now) return null

    return { dateError: true }
  }

  // 表单初始化
  formInit() {
    this.employeeAddForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      gender: ['1', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.pattern('1\\d{10}')]],
      joinDate: ['', [this.dateValidate]],
    })
  }

  submitForm(value: Employee): void {
    for (const key in this.employeeAddForm.controls) {
      this.employeeAddForm.controls[key].markAsDirty()
      this.employeeAddForm.controls[key].updateValueAndValidity()
    }
    let params = {
      ...value,
      joinDate: value.joinDate ? +value.joinDate : Date.now(), // 没有选中时间 默认今天
    }
    console.log(params)
    this.employeeService.addEmployee(params).subscribe((res) => {
      this.router.navigate(['/home/employee'])
    })
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault()
    this.employeeAddForm.reset({ gender: '1' }) // 重置时gender的默认值
    for (const key in this.employeeAddForm.controls) {
      this.employeeAddForm.controls[key].markAsPristine()
      this.employeeAddForm.controls[key].updateValueAndValidity()
    }
  }

  ngOnInit(): void {
    this.formInit()
  }
}
