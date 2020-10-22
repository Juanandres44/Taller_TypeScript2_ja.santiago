export class Student {
    code: number;
    cedula: number;
    age: string;
    address: string;
    telephone:number
  
    constructor(code: number, cedula:number, age: string, address: string, telephone: number) {
      this.code = code;
      this.cedula = cedula;
      this.age = age;
      this.address = address;
      this.telephone = telephone;
    }
  }