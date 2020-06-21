import { Component, OnInit } from '@angular/core'
import { HttpResponse } from '@angular/common/http'
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms'

import { NzMessageService } from 'ng-zorro-antd/message'

import { EmployeeService } from '../employee.service'
import { EmployeeList } from '../employee.type'

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
})
export class EmployeeListComponent implements OnInit {
  isLoading = false // 加载中
  employeeList: EmployeeList[] = []
  page = 1
  limit = 5
  total: number

  modifyModel = false // 修改弹窗
  employeeModifyForm: FormGroup

  constructor(
    private employeeService: EmployeeService,
    private message: NzMessageService,
    private fb: FormBuilder
  ) {}

  // trackBy
  employeeTrackById(index: number, item: EmployeeList) {
    return item.id
  }

  // 获取列表
  getEmployeeList() {
    this.isLoading = true
    this.employeeService
      .getEmployeeList(this.page, this.limit)
      .subscribe((res: HttpResponse<EmployeeList[]>) => {
        this.total = +res.headers.get('X-Total-Count') // 拿到total
        this.employeeList = [...res.body]
        this.isLoading = false
      })
  }

  // 确认删除
  delEnter(id) {
    console.log(id)
    this.employeeService.delEmployee(id).subscribe(
      () => {
        this.page = 1 // 每次操作后从第一页开始查询
        this.getEmployeeList()
      },
      () => this.message.create('warning', '删除失败')
    )
  }

  // 显示弹窗
  showModify(id: number): void {
    this.getEmployeeInfo(id)
    this.modifyModel = true
  }

  // 关闭弹窗
  handleCancel(): void {
    this.modifyModel = false
    this.resetForm()
  }

  // 自定义日期验证，选中的日期不能大于今天
  dateValidate(date: AbstractControl) {
    const now = Date.now()
    if (+date.value <= now) return null

    return { dateError: true }
  }

  // 表单初始化
  formInit() {
    this.employeeModifyForm = this.fb.group({
      id: [''],
      name: ['', [Validators.required, Validators.minLength(2)]],
      gender: ['1', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.pattern('1\\d{10}')]],
      joinDate: ['', [this.dateValidate]],
    })
  }

  // 获取员工信息
  getEmployeeInfo(id: number) {
    this.employeeService.getEmployeeInfo(id).subscribe((res: EmployeeList) => {
      res.joinDate = new Date(res.joinDate)
      this.employeeModifyForm.patchValue(res)
    })
  }

  submitForm(value: EmployeeList): void {
    for (const key in this.employeeModifyForm.controls) {
      this.employeeModifyForm.controls[key].markAsDirty()
      this.employeeModifyForm.controls[key].updateValueAndValidity()
    }

    // 校验不通过
    if (!this.employeeModifyForm.valid) return

    let params = {
      ...value,
      joinDate: value.joinDate ? +value.joinDate : Date.now(), // 没有选中时间 默认今天
    }
    console.log(params)
    this.employeeService.modifyEmployeeInfo(params.id, params).subscribe(() => {
      this.modifyModel = false
      this.resetForm() // 重置表单
      this.getEmployeeList() // 重新加载列表
    })
  }

  resetForm(): void {
    this.employeeModifyForm.reset()
    for (const key in this.employeeModifyForm.controls) {
      this.employeeModifyForm.controls[key].markAsPristine()
      this.employeeModifyForm.controls[key].updateValueAndValidity()
    }
  }

  ngOnInit(): void {
    this.getEmployeeList()
    this.formInit()
  }
}
