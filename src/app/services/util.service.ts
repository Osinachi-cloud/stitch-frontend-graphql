import { Injectable } from '@angular/core';

export class UtilService {

  constructor() { }


  static setUserDetails(value: string): void | null {
    return localStorage.setItem('userDetails', JSON.stringify(value));
  }

  static getUserDetails():any {
    let userDetails;
    if (localStorage.getItem('userDetails')) {
      userDetails = JSON.parse(localStorage.getItem('userDetails') || '{}');
    } 
    return userDetails;
  }

  static formatBase64(base64: string): string {
    console.log("ans",base64)

   let res = base64.split(",")[1];
    //  let res = base64?.replace("data:image/png;base64,", "");
     console.log("ans",res)
     return res;
  }
}
