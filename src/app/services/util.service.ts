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

  static formatBase64(base64Char: string, base64: string): string {
    base64Char = base64?.replace("data:image/png;base64,", "");
    return base64Char;
  }
}
