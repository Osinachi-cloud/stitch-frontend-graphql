
import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';

export class TokenService {

  static getToken(): string | null {
    return localStorage.getItem('token'); 
  }

  static setToken(value: string): void | null {
    return localStorage.setItem('token', value);
  }

  static isTokenExpired(token: string): boolean {
    const decodedToken = this.decodeToken(token);
    console.log();
    const expirationDate = new Date(decodedToken?.exp * 1000); 
    console.log("expirationDate",expirationDate);
    console.log(new Date());
    console.log(expirationDate < new Date() ? "token has expired o": "token has not expired o")
    return expirationDate < new Date(); 
  }

  static decodeToken(token: string): jwt_decode.JwtPayload | null {
    try {
      return jwt_decode.jwtDecode<jwt_decode.JwtPayload>(token); // Decode the token and return the payload
    } catch (error: any) {
      console.error('Invalid token', error);
      return null;
    }
  }

}

