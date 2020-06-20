export interface Employee {
  name: string
  gender: string
  phoneNumber: string
  email: string
  joinDate: string | number
}

export interface EmployeeList extends Employee {
  id: number
}
